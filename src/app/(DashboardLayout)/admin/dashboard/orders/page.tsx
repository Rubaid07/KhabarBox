"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ChefHat,
  Clock,
  Bike,
  LucideIcon,
  RefreshCw,
  Store,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getAllOrders, updateOrderStatus, cancelOrder } from "@/lib/api-admin";
import { formatDate, formatPrice } from "@/lib/utils";
import PaginationControls from "@/components/ui/pagination-controls";

type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

interface StatusItem {
  label: string;
  color: string;
  icon: LucideIcon;
}

const statusConfig: Record<OrderStatus, StatusItem> = {
  PLACED: {
    label: "Placed",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  PREPARING: {
    label: "Preparing",
    color: "bg-yellow-100 text-yellow-800",
    icon: ChefHat,
  },
  READY: {
    label: "Ready",
    color: "bg-purple-100 text-purple-800",
    icon: Clock,
  },
  DELIVERED: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: Bike,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

interface StatusAction {
  label: string;
  value: OrderStatus;
  icon: LucideIcon;
  color: string;
}

const statusActions: Record<OrderStatus, StatusAction[]> = {
  PLACED: [
    {
      label: "Start Preparing",
      value: "PREPARING",
      icon: ChefHat,
      color: "text-yellow-600",
    },
    {
      label: "Mark Ready",
      value: "READY",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "Mark Delivered",
      value: "DELIVERED",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Cancel Order",
      value: "CANCELLED",
      icon: XCircle,
      color: "text-red-600",
    },
  ],
  PREPARING: [
    {
      label: "Mark Ready",
      value: "READY",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "Mark Delivered",
      value: "DELIVERED",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Cancel Order",
      value: "CANCELLED",
      icon: XCircle,
      color: "text-red-600",
    },
  ],
  READY: [
    {
      label: "Mark Delivered",
      value: "DELIVERED",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Cancel Order",
      value: "CANCELLED",
      icon: XCircle,
      color: "text-red-600",
    },
  ],
  DELIVERED: [],
  CANCELLED: [],
};

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  customer: { name: string; email: string };
  provider: { providerProfile?: { restaurantName?: string } };
  orderItems: { meal: { name: string } }[];
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    loadOrders();
  }, [currentPage]);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllOrders({
        page: currentPage,
        limit: 10,
      });
      setOrders(result.data);
      setMeta({
  page: result.meta.page || currentPage,
  limit: result.meta.limit || 10,
  total: result.meta.total || 0,
  totalPages: result.meta.totalPage || result.meta.totalPages || 1, 
});
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Order marked as ${status}`);
      loadOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleCancel = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      toast.success("Order cancelled");
      loadOrders();
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const orderStats = {
    total: meta.total,
    placed: orders.filter((o) => o.status === "PLACED").length,
    preparing: orders.filter((o) => o.status === "PREPARING").length,
    ready: orders.filter((o) => o.status === "READY").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and track all orders</p>
        </div>
        <Button
          onClick={loadOrders}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg shrink-0">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold leading-tight">
                {orderStats.placed}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                New Orders
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg shrink-0">
              <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold leading-tight">
                {orderStats.preparing}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Preparing
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold leading-tight">
                {orderStats.ready}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">Ready</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg shrink-0">
              <Bike className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold leading-tight">
                {orderStats.delivered}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Delivered
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg shrink-0">
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold leading-tight">
                {orderStats.cancelled}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Cancelled
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters - ইউজার ম্যানেজমেন্টের মতো */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by customer or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PLACED">Placed</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            All Orders ({filteredOrders.length} of {meta.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => {
                      const currentStatus = order.status as OrderStatus;
                      const status = statusConfig[currentStatus];
                      const StatusIcon = status?.icon;
                      const actions = statusActions[currentStatus] || [];

                      return (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                #{order.id.slice(-8)}
                              </p>
                              <p className="text-xs text-gray-400">
                                ID: {order.id.slice(0, 8)}...
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                {order.customer.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.customer.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Store className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {order.provider?.providerProfile
                                  ?.restaurantName || "Unknown"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={status?.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status?.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-gray-900">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(order.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {actions.length > 0 && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {actions.map((action) => {
                                    const ActionIcon = action.icon;
                                    return (
                                      <DropdownMenuItem
                                        key={action.value}
                                        onClick={() =>
                                          action.value === "CANCELLED"
                                            ? handleCancel(order.id)
                                            : handleStatusUpdate(
                                                order.id,
                                                action.value,
                                              )
                                        }
                                        className={action.color}
                                      >
                                        <ActionIcon className="h-4 w-4 mr-2" />
                                        {action.label}
                                      </DropdownMenuItem>
                                    );
                                  })}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {meta && meta.totalPages > 1 && (
                <div className="mt-6">
                  <PaginationControls meta={meta} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

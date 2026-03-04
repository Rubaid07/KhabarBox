import { Users, TrendingUp, Smartphone, Star, } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Restaurants Across Bangladesh
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing community of successful restaurant partners
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Active Restaurants", value: "500+", icon: Users },
              { label: "Monthly Orders", value: "50K+", icon: TrendingUp },
              { label: "Cities Covered", value: "15+", icon: Smartphone },
              { label: "Customer Rating", value: "4.8★", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
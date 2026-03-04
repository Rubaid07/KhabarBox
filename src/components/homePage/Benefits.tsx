import { BarChart3, Clock, HeadphonesIcon, MapPin, Users, UtensilsCrossed } from 'lucide-react';

const benefitData = [
  {
    title: "More Local Orders",
    description: "Connect with thousands of hungry customers in your neighborhood who are looking for delicious meals.",
    icon: Users,
    colorClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Simple Order Tracking",
    description: "Manage incoming orders easily through your dedicated dashboard. Stay updated from preparation to delivery.",
    icon: BarChart3,
    colorClass: "bg-purple-50 text-purple-600",
  },
  {
    title: "Cash on Delivery (COD)",
    description: "No complex payment setups. Customers pay in cash upon delivery, ensuring a simple and trusted process for everyone.",
    icon: Clock, // COD এর জন্য ঘড়ি বা হ্যান্ডওভার আইকন ভালো দেখায়
    colorClass: "bg-orange-50 text-orange-600",
  },
  {
    title: "Expand Your Reach",
    description: "Deliver to areas you couldn't reach before. Our delivery network helps you expand your restaurant's footprint.",
    icon: MapPin,
    colorClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help you with order issues, menu updates, or any technical assistance you need.",
    icon: HeadphonesIcon,
    colorClass: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Flexible Menu Control",
    description: "Update your food items, prices, and availability instantly based on your kitchen's stock and timing.",
    icon: UtensilsCrossed,
    colorClass: "bg-rose-50 text-rose-600",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Partner with {" "}
            <span className="text-orange-600">Khabar Box?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The simplest way to bring your delicious food to more doorsteps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitData.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className={`w-14 h-14 ${benefit.colorClass} rounded-xl flex items-center justify-center mb-4`}>
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
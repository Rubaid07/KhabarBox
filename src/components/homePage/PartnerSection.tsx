"use client";

import Image from "next/image";
import { CheckCircle, TrendingUp, Star, Quote, UserPlus, ClipboardCheck, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Start Registration",
    desc: "Sign out of your current account and go to the Signup page."
  },
  {
    icon: ClipboardCheck,
    title: "Choose Provider Tab",
    desc: "Select the 'Provider' tab and fill out your restaurant's details."
  },
  {
    icon: Rocket,
    title: "Verify & Launch",
    desc: "Verify your email to activate your shop and start receiving orders."
  }
];

const benefits = [
  "Zero commission for first 3 months",
  "Reach 50,000+ active customers",
  "Real-time order management",
  "Weekly payouts & analytics dashboard",
];

export default function PartnerSection() {
  return (
    <section className="py-20 bg-linear-to-br from-orange-50/80 via-white to-orange-50/50 overflow-hidden">
      <div className="lg:container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 gap-1.5 px-3 py-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Restaurant Partnerships
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Grow Your Business as a{" "}
                <span className="text-orange-600">Restaurant Partner</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Join KhabarBox to reach thousands of hungry customers and scale your kitchen with our easy-to-use platform.
              </p>
            </div>

            {/* How to Join Steps */}
            <div className="grid gap-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                How to Join?
              </h3>
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 bg-white border border-orange-100 rounded-xl flex items-center justify-center shadow-sm">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Highlight */}
            <div className="bg-orange-100/30 p-6 rounded-2xl border border-orange-100/50 space-y-3">
              <p className="font-semibold text-orange-800 mb-2">Why Partner with Us?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Image & Testimonial */}
          <div className="relative">
            <Card className="relative h-125 lg:h-162.5 overflow-hidden border-0 shadow-2xl rounded-[2.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                alt="Professional Chef in Kitchen"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              {/* Testimonial Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                <Quote className="w-8 h-8 text-orange-400 mb-2 opacity-80" />
                <p className="text-lg italic font-medium mb-4 leading-relaxed">
                  &quot;Our online orders doubled within just 2 months! The dashboard is incredibly intuitive and the support is top-notch.&quot;
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="font-bold text-white">Rafiq Ahmed</p>
                    <p className="text-xs text-orange-200 uppercase tracking-wider">Owner, Spice Garden Restaurant</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Growth Badge */}
            <Card className="absolute -top-6 -left-6 p-5 shadow-2xl border-0 rounded-2xl bg-white hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">200%+</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Avg. Business Growth</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Lock, 
  Truck, 
  Check, 
  ChevronRight, 
  ShieldCheck,
  ArrowLeft,
  Gift,
  Tag
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const cartItems = [
  { id: 1, name: "Vitamin C Glow Serum", price: 68, quantity: 2, image: product1 },
  { id: 2, name: "Nourishing Body Lotion", price: 42, quantity: 1, image: product2 },
];

const steps = [
  { id: 1, name: "Cart", status: "complete" },
  { id: 2, name: "Information", status: "complete" },
  { id: 3, name: "Payment", status: "current" },
  { id: 4, name: "Confirmation", status: "upcoming" },
];

const Checkout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 md:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cart">Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Progress Steps */}
        <div className="mb-10">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${
                    step.status === "complete" ? "text-secondary" : 
                    step.status === "current" ? "text-primary" : "text-muted-foreground"
                  }`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                      step.status === "complete" ? "bg-secondary text-secondary-foreground" : 
                      step.status === "current" ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : 
                      "bg-muted text-muted-foreground"
                    }`}>
                      {step.status === "complete" ? <Check className="h-4 w-4" /> : step.id}
                    </span>
                    <span className="hidden sm:block text-sm font-medium">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-2 md:mx-4 text-muted-foreground" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Payment Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                <span className="inline-flex items-center gap-1 text-xs text-secondary">
                  <Check className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-muted-foreground">john.doe@email.com</p>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
                <Button variant="ghost" size="sm" className="text-primary">Edit</Button>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p className="font-medium text-foreground">John Doe</p>
                <p>123 Beauty Lane</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                {/* Card Payment */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary"
                  />
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <span className="font-medium text-foreground">Credit / Debit Card</span>
                  <div className="ml-auto flex gap-2">
                    <div className="h-6 w-10 rounded bg-gradient-to-br from-blue-600 to-blue-800" />
                    <div className="h-6 w-10 rounded bg-gradient-to-br from-red-500 to-orange-500" />
                    <div className="h-6 w-10 rounded bg-gradient-to-br from-yellow-400 to-yellow-600" />
                  </div>
                </label>

                {/* PayPal */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="h-5 w-5 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">P</div>
                  <span className="font-medium text-foreground">PayPal</span>
                </label>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM / YY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" className="mt-1.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-secondary" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-secondary" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Promo Code */}
              <div className="mb-4">
                <Label htmlFor="promo" className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4" />
                  Promo Code
                </Label>
                <div className="flex gap-2">
                  <Input 
                    id="promo" 
                    placeholder="Enter code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-secondary font-medium" : "text-foreground"}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>

              {/* Free Gift Banner */}
              <div className="mb-6 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 p-4">
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Gift Included!</p>
                    <p className="text-xs text-muted-foreground">Deluxe sample with your order</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="w-full gap-2" size="lg">
                <Lock className="h-4 w-4" />
                Complete Order
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                By completing this order, you agree to our{" "}
                <Link to="#" className="underline hover:text-primary">Terms of Service</Link>{" "}
                and{" "}
                <Link to="#" className="underline hover:text-primary">Privacy Policy</Link>.
              </p>
            </div>

            <Link 
              to="/cart" 
              className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Cart
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

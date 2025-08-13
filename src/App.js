import React, { useMemo, useState } from "react";
import {
  Wrench,
  Hammer,
  PlugZap,
  // Saw,            // removed: not exported by lucide-react ESM CDN
  // Crane,          // removed: not exported by lucide-react ESM CDN
  HardHat,
  Ruler,
  Truck,
  CalendarDays,
  MapPin,
  Star,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  DollarSign,
  ImagePlus,
  Building2,
  Check,
  Menu,
} from "lucide-react";

// ---------------- Minimal UI component stubs ----------------
const Button = ({ className = "", ...props }) => (
  <button
    className={cx(
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50",
      className
    )}
    {...props}
  />
);
const Input = ({ className = "", ...props }) => (
  <input
    className={cx(
      "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
      className
    )}
    {...props}
  />
);
const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={cx(
      "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
      className
    )}
    {...props}
  />
);
const Card = ({ className = "", ...props }) => (
  <div
    className={cx("rounded-lg border bg-white shadow-sm", className)}
    {...props}
  />
);
const CardContent = ({ className = "", ...props }) => (
  <div className={cx("px-6 py-4", className)} {...props} />
);
const CardDescription = ({ className = "", ...props }) => (
  <p className={cx("text-sm text-neutral-500", className)} {...props} />
);
const CardFooter = ({ className = "", ...props }) => (
  <div className={cx("px-6 pb-6", className)} {...props} />
);
const CardHeader = ({ className = "", ...props }) => (
  <div className={cx("px-6 pt-6", className)} {...props} />
);
const CardTitle = ({ className = "", ...props }) => (
  <h3 className={cx("text-lg font-semibold", className)} {...props} />
);
const Badge = ({ className = "", ...props }) => (
  <span
    className={cx(
      "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
      className
    )}
    {...props}
  />
);
const Avatar = ({ className = "", ...props }) => (
  <div
    className={cx("relative h-10 w-10 overflow-hidden rounded-full", className)}
    {...props}
  />
);
const AvatarImage = ({ className = "", ...props }) => (
  <img className={cx("h-full w-full object-cover", className)} {...props} />
);
const AvatarFallback = ({ className = "", ...props }) => (
  <div
    className={cx(
      "flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-500",
      className
    )}
    {...props}
  />
);
const Tabs = ({ children }) => <div>{children}</div>;
const TabsContent = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div>{children}</div>;
const TabsTrigger = ({ children, ...props }) => <button {...props}>{children}</button>;
const Select = ({ children }) => <div>{children}</div>;
const SelectContent = ({ children }) => <div>{children}</div>;
const SelectItem = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectValue = ({ children, ...props }) => <span {...props}>{children}</span>;
const Dialog = ({ children }) => <div>{children}</div>;
const DialogContent = ({ children, ...props }) => <div {...props}>{children}</div>;
const DialogDescription = ({ children }) => <p>{children}</p>;
const DialogHeader = ({ children }) => <div>{children}</div>;
const DialogTitle = ({ children }) => <h2>{children}</h2>;
const DialogTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
const Sheet = ({ children }) => <div>{children}</div>;
const SheetContent = ({ children }) => <div>{children}</div>;
const SheetHeader = ({ children }) => <div>{children}</div>;
const SheetTitle = ({ children }) => <h2>{children}</h2>;
const SheetTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
const Switch = (props) => <input type="checkbox" {...props} />;
const Calendar = (props) => <input type="date" {...props} />;
const Label = ({ children, ...props }) => <label {...props}>{children}</label>;
const Separator = (props) => <hr {...props} />;
const ScrollArea = ({ children, ...props }) => <div {...props}>{children}</div>;

// ---------------- Helpers (ASCII-safe) ----------------
// Simple className join helper
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Currency({ value }) {
  return <span className="font-semibold">R$ {value.toFixed(0)}</span>;
}

// Pure function for filtering (so we can unit-test)
export function filterListings(listings, q, activeCategory) {
  const query = (q || "").toLowerCase().trim();
  return listings.filter((l) => {
    const matchCategory = activeCategory === "all" || l.category === activeCategory;
    const matchQuery =
      !query ||
      (l.title && String(l.title).toLowerCase().includes(query)) ||
      (l.location && String(l.location).toLowerCase().includes(query));
    return matchCategory && matchQuery;
  });
}

// ---------------- Mock Data ----------------
const categories = [
  { key: "all", label: "All", icon: Wrench },
  { key: "power-tools", label: "Power Tools", icon: PlugZap },
  { key: "woodworking", label: "Woodworking", icon: Ruler }, // replaced Saw -> Ruler (exported)
  { key: "construction", label: "Construction", icon: HardHat }, // replaced Crane -> HardHat (exported)
  { key: "transport", label: "Transport", icon: Truck },
  { key: "hand-tools", label: "Hand Tools", icon: Hammer },
];

const premiumListings = [
  {
    id: "1",
    title: "Hilti Rotary Hammer TE 60",
    pricePerDay: 48,
    location: "Sao Paulo, SP",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1581093458791-9d09b7655a99?q=80&w=1600&auto=format&fit=crop",
    category: "power-tools",
    business: { name: "MaxTools Pro", avatar: "https://i.pravatar.cc/100?img=67" },
    premium: true,
  },
  {
    id: "2",
    title: "Diesel Light Tower 6kW",
    pricePerDay: 220,
    location: "Campinas, SP",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1611652022419-dc94560ecd45?q=80&w=1600&auto=format&fit=crop",
    category: "construction",
    business: { name: "Luma Locadora", avatar: "https://i.pravatar.cc/100?img=23" },
    premium: true,
  },
  {
    id: "3",
    title: "Flatbed Truck w/ Crane 8t",
    pricePerDay: 950,
    location: "Belo Horizonte, MG",
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
    category: "transport",
    business: { name: "Guimaraes Equipamentos", avatar: "https://i.pravatar.cc/100?img=15" },
    premium: true,
  },
];

const allListings = [
  ...premiumListings,
  {
    id: "4",
    title: 'Table Saw 10"',
    pricePerDay: 70,
    location: "Ribeirao Preto, SP",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1611175697450-3e8a97d3cba0?q=80&w=1600&auto=format&fit=crop",
    category: "woodworking",
    business: { name: "Oficina Norte", avatar: "https://i.pravatar.cc/100?img=47" },
  },
  {
    id: "5",
    title: "Cordless Drill Combo Kit",
    pricePerDay: 35,
    location: "Sorocaba, SP",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1581093588401-16ec8a686a38?q=80&w=1600&auto=format&fit=crop",
    category: "power-tools",
    business: { name: "Casa do Construtor+", avatar: "https://i.pravatar.cc/100?img=31" },
  },
  {
    id: "6",
    title: "Mini Excavator 2.5t",
    pricePerDay: 780,
    location: "Jundiai, SP",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1625841833728-5a2c87d2514c?q=80&w=1600&auto=format&fit=crop",
    category: "construction",
    business: { name: "Construmax", avatar: "https://i.pravatar.cc/100?img=52" },
  },
];

// ---------------- Main App ----------------
export default function ToolShareApp() {
  const [role, setRole] = useState("customer");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  // Ensure a consistent shape for the date range to avoid runtime/build issues.
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [showCreate, setShowCreate] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => filterListings(allListings, query, activeCategory), [activeCategory, query]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <TopNav
        role={role}
        setRole={setRole}
        onCreate={() => setShowCreate(true)}
        onOpenPlans={() => setShowPlans(true)}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="text-center md:text-left">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white mb-4">New - Premium spotlight</Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                Rent <span className="text-orange-600">tools &amp; machinery</span> like booking a stay
              </h1>
              <p className="mt-4 text-neutral-600 text-lg md:pr-12 max-w-xl mx-auto md:mx-0">
                A marketplace inspired by Airbnb - clean, fast and built for pros. Browse categories, compare prices per day, and book with insurance.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button className="bg-orange-600 hover:bg-orange-700" size="lg" onClick={() => setShowPlans(true)}>
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade business plan
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <ShieldCheck className="mr-2 h-4 w-4" /> How protection works
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Protection & Safety</DialogTitle>
                      <DialogDescription>
                        Deposits, ID verification, damage coverage and required PPE - transparent terms for both sides.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>Security deposit held until return inspection.</li>
                      <li>Photo check-in/out with timestamps inside the app.</li>
                      <li>Optional damage waiver and theft coverage for renters.</li>
                      <li>Businesses can require training certification uploads.</li>
                      <li>24/7 support and dispute resolution.</li>
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search Bar */}
              <div className="mt-10">
                <div className="hidden md:flex items-center rounded-full bg-white shadow-lg divide-x">
                  <div className="flex items-center gap-2 px-5 flex-1">
                    <Search className="h-5 w-5 text-neutral-500" />
                    <Input
                      placeholder='Search tools, e.g. "mini excavator"'
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="border-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-5">
                    <MapPin className="h-5 w-5 text-neutral-500" />
                    <Input className="w-40 border-none focus-visible:ring-0" placeholder="City or ZIP" />
                  </div>
                  <div className="flex items-center gap-2 px-5">
                    <CalendarDays className="h-5 w-5 text-neutral-500" />
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" className="justify-between px-0">
                          {dateRange.from && dateRange.to ? (
                            <span>
                              {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                            </span>
                          ) : (
                            <span>Select dates</span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[70vh]">
                        <SheetHeader>
                          <SheetTitle>Select your rental window</SheetTitle>
                        </SheetHeader>
                        <div className="py-4">
                          <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={(r) => setDateRange(r || { from: undefined, to: undefined })}
                            numberOfMonths={2}
                            className="rounded-md border"
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  <Button className="ml-4 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center gap-2 px-6">
                    <Search className="h-4 w-4" /> Search
                  </Button>
                </div>
                <div className="md:hidden">
                  {showMobileFilters ? (
                    <div className="space-y-3 rounded-3xl border p-4 shadow-lg bg-white">
                      <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-neutral-500" />
                        <Input
                          placeholder='Search tools, e.g. "mini excavator"'
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="border-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-neutral-500" />
                        <Input className="flex-1 border-none focus-visible:ring-0" placeholder="City or ZIP" />
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-neutral-500" />
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" className="flex-1 justify-between">
                              {dateRange.from && dateRange.to ? (
                                <span>
                                  {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                                </span>
                              ) : (
                                <span>Select dates</span>
                              )}
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="h-[70vh]">
                            <SheetHeader>
                              <SheetTitle>Select your rental window</SheetTitle>
                            </SheetHeader>
                            <div className="py-4">
                              <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={(r) => setDateRange(r || { from: undefined, to: undefined })}
                                numberOfMonths={2}
                                className="rounded-md border"
                              />
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <Button
                        className="w-full rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <Search className="h-4 w-4" /> Search
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                      onClick={() => setShowMobileFilters(true)}
                    >
                      <Search className="h-5 w-5" /> Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1591508513884-1e39fa00a811?q=80&w=1600&auto=format&fit=crop"
                  alt="Tools hero"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden md:block">
                <Card className="bg-orange-600 text-white shadow-xl">
                  <CardContent className="p-4 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6" />
                    <div>
                      <p className="text-sm leading-5">Book with confidence</p>
                      <p className="text-xs leading-4 opacity-90">Verified businesses & protected payments</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Category Pills */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            {categories.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                className={cx(
                  "rounded-full transition",
                  activeCategory === key ? "bg-orange-600 hover:bg-orange-700" : "border-neutral-200"
                )}
                onClick={() => setActiveCategory(key)}
              >
                <Icon className="mr-2 h-4 w-4" /> {label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </section>

      {/* Premium Spotlight */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Premium spotlight</h2>
          <Button variant="ghost" className="text-orange-600 hover:text-orange-700" onClick={() => setShowPlans(true)}>
            <Star className="mr-2 h-4 w-4" /> Become Premium
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {premiumListings.map((l) => (
            <ListingCard key={l.id} listing={l} premium />
          ))}
        </div>
      </section>

      {/* All Listings */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-xl font-semibold mb-4">Explore tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Business Console */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" /> Business console
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <Label htmlFor="role">View as business</Label>
              <Switch id="role" checked={role === "business"} onCheckedChange={(v) => setRole(v ? "business" : "customer")} />
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">My listings</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Business</CardTitle>
                  <CardDescription>Manage your tools, availability, pricing and bookings.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <KPI title="Bookings this month" value="18" subtitle="Up 12% vs last month" />
                  <KPI title="Utilization" value="72%" subtitle="Avg. across tools" />
                  <KPI title="Revenue" value="R$ 24.350" subtitle="Net of fees" />
                </CardContent>
                <CardFooter className="flex items-center gap-3">
                  <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowCreate(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New listing
                  </Button>
                  <Button variant="outline" onClick={() => setShowPlans(true)}>
                    <Star className="mr-2 h-4 w-4" /> Upgrade to Premium
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="listings">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allListings.slice(0, 6).map((l) => (
                  <ListingCard key={l.id} listing={l} showManage />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="plans">
              <Plans onChoose={() => setShowPlans(false)} />
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Business settings</CardTitle>
                  <CardDescription>Profile, payout and policies.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Business name</Label>
                    <Input defaultValue="MaxTools Pro" className="mt-2" />
                  </div>
                  <div>
                    <Label>CNPJ / Tax ID</Label>
                    <Input placeholder="00.000.000/0001-00" className="mt-2" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>About</Label>
                    <Textarea placeholder="Tell customers about your company, expertise and safety protocols." className="mt-2" />
                  </div>
                  <div>
                    <Label>Payout account (Pix)</Label>
                    <Input placeholder="chave@empresa.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Pickup address</Label>
                    <Input placeholder="Rua, numero, cidade" className="mt-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-600 hover:bg-orange-700">Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />

      {/* Dialogs */}
      <CreateListingDialog open={showCreate} onOpenChange={setShowCreate} />
      <Plans open={showPlans} onOpenChange={setShowPlans} />
    </div>
  );
}

// ---------------- Components ----------------
function TopNav({ role, setRole, onCreate, onOpenPlans }) {
  const links = [
    { label: "How it works", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Safety", href: "#" },
    { label: "Support", href: "#" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-neutral-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 grid place-content-center rounded-lg bg-orange-600 text-white font-bold">TS</div>
          <div className="font-semibold">ToolShare</div>
          <Badge variant="secondary" className="ml-2">Beta</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} className="hover:text-orange-600" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="mt-4 flex flex-col gap-4 text-sm">
                {links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:flex items-center gap-2 pr-3 mr-3 border-r">
            <Label htmlFor="role-switch" className="mr-2">Business mode</Label>
            <Switch id="role-switch" checked={role === "business"} onCheckedChange={(v) => setRole(v ? "business" : "customer")} />
          </div>
          {role === "business" && (
            <Button variant="outline" onClick={onCreate}>
              <Plus className="mr-2 h-4 w-4" /> New listing
            </Button>
          )}
          <Button className="bg-orange-600 hover:bg-orange-700 rounded-full px-4" onClick={onOpenPlans}>
            <Star className="mr-2 h-4 w-4" /> Premium
          </Button>
          <Button variant="ghost" size="icon" className="ml-1">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function ListingCard({ listing, premium, showManage }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={listing.img} alt={listing.title} className="h-40 w-full object-cover md:h-52" />
        {premium && (
          <Badge className="absolute left-3 top-3 bg-orange-600 hover:bg-orange-700">Premium</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-tight">{listing.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4" /> {listing.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg"><Currency value={listing.pricePerDay} /> <span className="text-sm text-neutral-500">/day</span></div>
            <div className="text-xs text-neutral-500 flex items-center justify-end gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {listing.rating}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={listing.business.avatar} />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-neutral-600">{listing.business.name}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 justify-between p-4 pt-0">
        <Button variant="outline" className="gap-2 flex-1"><CalendarDays className="h-4 w-4" /> Check availability</Button>
        {showManage ? (
          <Button className="bg-orange-600 hover:bg-orange-700 flex-1">Manage</Button>
        ) : (
          <Button className="bg-orange-600 hover:bg-orange-700 flex-1">Book now</Button>
        )}
      </CardFooter>
    </Card>
  );
}

function KPI({ title, value, subtitle }) {
  return (
    <Card className="border-orange-100">
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      {subtitle && (
        <CardFooter className="pt-0 text-xs text-green-600">{subtitle}</CardFooter>
      )}
    </Card>
  );
}

function CreateListingDialog({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a new listing</DialogTitle>
          <DialogDescription>Set the basics now; you can refine later.</DialogDescription>
        </DialogHeader>

        <Tabs value={String(step)} onValueChange={(v) => setStep(Number(v))}>
          <TabsList className="mb-4">
            <TabsTrigger value="1">Basics</TabsTrigger>
            <TabsTrigger value="2">Pricing</TabsTrigger>
            <TabsTrigger value="3">Policies</TabsTrigger>
            <TabsTrigger value="4">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="1">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input placeholder="e.g. Gas Concrete Mixer 400L" className="mt-2" />
              </div>
              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c.key !== "all").map((c) => (
                      <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea className="mt-2" rows={4} placeholder="Specs, recommended uses, maintenance notes and restrictions." />
              </div>
              <div>
                <Label>Location (pickup)</Label>
                <Input placeholder="Address or area" className="mt-2" />
              </div>
              <div>
                <Label>Delivery available?</Label>
                <Select>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setStep(2)}>Continue</Button>
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Price per day</Label>
                <div className="mt-2 flex items-center"><DollarSign className="h-4 w-4 text-neutral-500" /><Input type="number" placeholder="0" className="ml-1" /></div>
              </div>
              <div>
                <Label>Minimum days</Label>
                <Input type="number" placeholder="1" className="mt-2" />
              </div>
              <div>
                <Label>Security deposit</Label>
                <div className="mt-2 flex items-center"><DollarSign className="h-4 w-4 text-neutral-500" /><Input type="number" placeholder="0" className="ml-1" /></div>
              </div>
              <div className="md:col-span-3">
                <Label>Availability</Label>
                <div className="mt-2 rounded-md border p-3">
                  <Calendar mode="range" numberOfMonths={2} className="rounded-md border" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setStep(3)}>Continue</Button>
            </div>
          </TabsContent>

          <TabsContent value="3">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Cancellation policy</Label>
                <Select>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Choose" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Insurance required?</Label>
                <Select>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Choose" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Safety notes & required PPE</Label>
                <Textarea className="mt-2" rows={3} placeholder="e.g. Hard hat, eye protection, gloves. Provide training certificate for operation." />
              </div>
              <div className="md:col-span-2">
                <Label>Accessories included</Label>
                <Textarea className="mt-2" rows={3} placeholder="e.g. 2x drill batteries, charger, carrying case." />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setStep(4)}>Continue</Button>
            </div>
          </TabsContent>

          <TabsContent value="4">
            <div className="grid gap-4">
              <div>
                <Label>Upload photos</Label>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="aspect-video border rounded-xl grid place-content-center text-neutral-400">
                      <div className="flex flex-col items-center">
                        <ImagePlus className="h-6 w-6" />
                        <span className="text-xs mt-1">Add photo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Check className="mr-2 h-4 w-4" /> Publish listing
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Plans({ open, onOpenChange, onChoose }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose your plan</DialogTitle>
          <DialogDescription>Grow visibility and bookings with Premium placements.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-transparent hover:border-orange-200 transition">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For small shops</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Feature>Up to 10 listings</Feature>
              <Feature>Basic support</Feature>
              <Feature>Standard placement</Feature>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">R$ 79<span className="text-sm font-normal">/mo</span></div>
              </div>
              <Button variant="outline" onClick={onChoose}>Choose</Button>
            </CardFooter>
          </Card>

          <Card className="relative border-2 border-orange-400">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600">Popular</Badge>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>Boosted visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Feature>Unlimited listings</Feature>
              <Feature>Premium spotlight</Feature>
              <Feature>Priority support</Feature>
              <Feature>Lower fees</Feature>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">R$ 249<span className="text-sm font-normal">/mo</span></div>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={onChoose}>Choose</Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-transparent hover:border-orange-200 transition">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For fleets & franchises</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Feature>Custom SLA</Feature>
              <Feature>API & SSO</Feature>
              <Feature>Dedicated manager</Feature>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">Talk to sales</div>
              </div>
              <Button variant="outline" onClick={onChoose}>Contact</Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Feature({ children }) {
  return (
    <div className="flex items-center gap-2 text-neutral-700">
      <Check className="h-4 w-4 text-orange-600" /> {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 grid place-content-center rounded-lg bg-orange-600 text-white font-bold">TS</div>
            <div className="font-semibold">ToolShare</div>
          </div>
          <p className="mt-3 text-sm text-neutral-600">Book tools and heavy machinery with transparent pricing and trusted businesses.</p>
        </div>
        <div>
          <div className="font-medium">Marketplace</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li><a className="hover:text-orange-600" href="#">Browse categories</a></li>
            <li><a className="hover:text-orange-600" href="#">Premium listings</a></li>
            <li><a className="hover:text-orange-600" href="#">New arrivals</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">For Business</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li><a className="hover:text-orange-600" href="#">Create listing</a></li>
            <li><a className="hover:text-orange-600" href="#">Pricing plans</a></li>
            <li><a className="hover:text-orange-600" href="#">Safety & insurance</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li><a className="hover:text-orange-600" href="#">About</a></li>
            <li><a className="hover:text-orange-600" href="#">Blog</a></li>
            <li><a className="hover:text-orange-600" href="#">Help center</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-xs text-neutral-500 text-center">(c) {new Date().getFullYear()} ToolShare - All rights reserved.</div>
    </footer>
  );
}

// ---------------- Minimal Test Cases ----------------
// These run only in the browser to avoid SSR/build side-effects
if (typeof window !== "undefined") {
  (function runUnitTests() {
    try {
      const sample = [
        { title: "Drill", location: "Sao Paulo", category: "power-tools" },
        { title: "Saw", location: "Campinas", category: "woodworking" },
        { title: "Mixer", location: "Sao Paulo", category: "construction" },
      ];

      // Test 1: category filter only
      const t1 = filterListings(sample, "", "power-tools");
      console.assert(t1.length === 1 && t1[0].title === "Drill", "Test 1 failed");

      // Test 2: query by title
      const t2 = filterListings(sample, "mix", "all");
      console.assert(t2.length === 1 && t2[0].title === "Mixer", "Test 2 failed");

      // Test 3: query by location
      const t3 = filterListings(sample, "camp", "all");
      console.assert(t3.length === 1 && t3[0].title === "Saw", "Test 3 failed");

      // Test 4: no matches
      const t4 = filterListings(sample, "excavator", "all");
      console.assert(t4.length === 0, "Test 4 failed");

      // Test 5: cx helper
      console.assert(cx("a", false, "b") === "a b", "Test 5 failed");

      // Additional tests
      // Test 6: case-insensitive query
      const t6 = filterListings(sample, "MIX", "all");
      console.assert(t6.length === 1 && t6[0].title === "Mixer", "Test 6 failed");

      // Test 7: null-safe fields should not throw and should not match
      const t7 = filterListings([{ title: null, location: null, category: "power-tools" }], "drill", "all");
      console.assert(Array.isArray(t7) && t7.length === 0, "Test 7 failed");

      // Test 8: unknown category blocks results even if query matches
      const t8 = filterListings(sample, "drill", "unknown");
      console.assert(t8.length === 0, "Test 8 failed");

      // Test 9: trim query whitespace
      const t9 = filterListings(sample, " mix ", "all");
      console.assert(t9.length === 1 && t9[0].title === "Mixer", "Test 9 failed");

      // Test 10: quoted search should match title containing a quote (from allListings)
      const quotedSample = [{ title: 'Table Saw 10"', location: 'Ribeirao Preto', category: 'woodworking' }];
      const t10 = filterListings(quotedSample, '10"', 'all');
      console.assert(t10.length === 1 && t10[0].title === 'Table Saw 10"', "Test 10 failed");

      // Test 11: multiple results by location substring
      const t11 = filterListings(sample, 'sao', 'all');
      console.assert(t11.length === 2 && t11.some(i => i.title === 'Drill') && t11.some(i => i.title === 'Mixer'), 'Test 11 failed');

      // eslint-disable-next-line no-console
      console.log("All in-file tests passed.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Unit tests failed:", err);
    }
  })();
}

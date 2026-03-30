import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Facebook,
  Glasses,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    desc: "Thorough evaluations of your vision and eye health using state-of-the-art diagnostic technology.",
  },
  {
    icon: Glasses,
    title: "Vision Correction",
    desc: "Custom prescriptions for glasses and contact lenses tailored to your unique visual needs.",
  },
  {
    icon: Sparkles,
    title: "Laser Eye Surgery",
    desc: "Advanced LASIK and PRK procedures for long-lasting freedom from glasses or contacts.",
  },
  {
    icon: Star,
    title: "Pediatric Eye Care",
    desc: "Gentle, specialized eye care designed for children from infancy through adolescence.",
  },
];

const DOCTORS = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Lead Ophthalmologist",
    experience: "15+ years experience",
    bio: "Specializing in advanced cataract surgery and glaucoma management with a patient-first approach.",
    img: "/assets/generated/doctor-1.dim_400x400.jpg",
  },
  {
    name: "Dr. James Carter",
    role: "Senior Optometrist",
    experience: "12+ years experience",
    bio: "Expert in pediatric optometry and contact lens fitting, dedicated to clear and comfortable vision.",
    img: "/assets/generated/doctor-2.dim_400x400.jpg",
  },
  {
    name: "Dr. Robert Lee",
    role: "Retina Specialist",
    experience: "10+ years experience",
    bio: "Pioneer in retinal diagnostics and macular degeneration treatment using cutting-edge imaging.",
    img: "/assets/generated/doctor-3.dim_400x400.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My vision has improved dramatically after the laser surgery. The team was professional and caring throughout the entire process.",
    author: "Maria S.",
    rating: 5,
  },
  {
    quote:
      "The most thorough eye exam I've ever had. Dr. Mitchell caught an issue my previous doctor missed completely.",
    author: "John D.",
    rating: 5,
  },
  {
    quote:
      "Brought my 8-year-old here for her first eye exam. The staff made her feel completely at ease — we'll definitely be back.",
    author: "Linda K.",
    rating: 5,
  },
];

const SOCIAL_LINKS = [
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/shaikh_sphere2008?igsh=amZreDJ5Z2s0emts",
  },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {STAR_KEYS.slice(0, count).map((k) => (
        <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { actor } = useActor();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [bookingState, setBookingState] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
  });

  function scrollTo(href: string) {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.time ||
      !form.service
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setBookingState("loading");
    try {
      if (!actor) throw new Error("Not connected");
      await actor.bookAppointment(
        crypto.randomUUID(),
        form.name,
        form.email,
        form.phone,
        form.date,
        form.time,
        form.service,
      );
      setBookingState("success");
      toast.success("Appointment booked! We'll confirm your visit shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
      });
    } catch {
      setBookingState("idle");
      toast.error("Booking failed. Please try again.");
    }
  }

  const prevTestimonial = () =>
    setTestimonialIdx(
      (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-clinic-bg font-sans">
      <Toaster />

      {/* Sticky Navigation */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{ background: "#0E5A73" }}
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5"
            data-ocid="nav.link"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#1B8EA6" }}
            >
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg leading-tight">
              ClearVision
              <br />
              <span className="text-xs font-normal opacity-80 tracking-wide">
                Eye Clinic
              </span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-white text-sm transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button
              type="button"
              onClick={() => scrollTo("#appointment")}
              className="rounded-full text-white font-semibold px-5 text-sm"
              style={{ background: "#1B8EA6" }}
              data-ocid="nav.primary_button"
            >
              Request Appointment
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ background: "#0a4a5f" }}
            >
              <nav className="flex flex-col px-6 py-4 gap-4">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/80 hover:text-white text-sm text-left transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  type="button"
                  onClick={() => scrollTo("#appointment")}
                  className="rounded-full text-white font-semibold mt-2"
                  style={{ background: "#1B8EA6" }}
                  data-ocid="nav.primary_button"
                >
                  Request Appointment
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: "#D9F1F4", color: "#0E5A73" }}
            >
              Advanced Eye Care
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight mb-6"
              style={{ color: "#222629" }}
            >
              Exceptional Eye Care for a{" "}
              <span style={{ color: "#1B8EA6" }}>Clearer Tomorrow</span>
            </h1>
            <p className="text-base mb-8 max-w-md" style={{ color: "#6B7785" }}>
              At ClearVision Eye Clinic, we combine cutting-edge technology with
              compassionate care to protect and enhance your vision at every
              stage of life.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                type="button"
                onClick={() => scrollTo("#appointment")}
                size="lg"
                className="rounded-full font-semibold px-8 text-white"
                style={{ background: "#1B8EA6" }}
                data-ocid="hero.primary_button"
              >
                Schedule Your Eye Exam
              </Button>
              <button
                type="button"
                onClick={() => scrollTo("#services")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#1B8EA6" }}
                data-ocid="hero.secondary_button"
              >
                Learn More →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-card-hover"
          >
            <img
              src="/assets/generated/hero-doctor.dim_800x600.jpg"
              alt="Doctor examining patient"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20"
        style={{ background: "#F6F8FA" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#222629" }}
            >
              Our Specialized Services
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#6B7785" }}
            >
              From routine check-ups to advanced surgical procedures, we offer
              comprehensive eye care services for all ages.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#D9F1F4" }}
                >
                  <svc.icon className="w-6 h-6" style={{ color: "#1B8EA6" }} />
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "#222629" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "#6B7785" }}
                >
                  {svc.desc}
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold"
                  style={{ color: "#1B8EA6" }}
                >
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "#222629" }}
            >
              Trusted Eye Care Since 2005
            </h2>
            <p
              className="text-base mb-4 leading-relaxed"
              style={{ color: "#6B7785" }}
            >
              For nearly two decades, ClearVision Eye Clinic has been the
              region's most trusted destination for complete eye health. Our
              board-certified specialists combine deep clinical expertise with
              the warmth of a family practice.
            </p>
            <p
              className="text-base mb-6 leading-relaxed"
              style={{ color: "#6B7785" }}
            >
              We invest in the latest diagnostic and treatment technologies so
              every patient receives accurate diagnoses and personalized care
              plans.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "18K+", label: "Patients Served" },
                { val: "3", label: "Expert Doctors" },
                { val: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl"
                  style={{ background: "#D9F1F4" }}
                >
                  <div
                    className="text-2xl font-extrabold"
                    style={{ color: "#0E5A73" }}
                  >
                    {stat.val}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#6B7785" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-card-hover"
          >
            <img
              src="/assets/generated/hero-doctor.dim_800x600.jpg"
              alt="Clinic interior"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="doctors" className="py-20" style={{ background: "#F6F8FA" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#222629" }}
            >
              Meet Our Expert Team
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#6B7785" }}
            >
              Our board-certified specialists bring decades of combined
              experience and a genuine commitment to your vision health.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {DOCTORS.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                data-ocid={`doctors.item.${i + 1}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "#222629" }}
                  >
                    {doc.name}
                  </h3>
                  <p
                    className="text-sm font-medium mt-0.5 mb-1"
                    style={{ color: "#1B8EA6" }}
                  >
                    {doc.role}
                  </p>
                  <p
                    className="text-xs font-medium mb-3"
                    style={{ color: "#6B7785" }}
                  >
                    {doc.experience}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B7785" }}
                  >
                    {doc.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section id="appointment" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#222629" }}
            >
              Book an Appointment
            </h2>
            <p className="text-base" style={{ color: "#6B7785" }}>
              Fill in the form below and our team will confirm your appointment
              within 24 hours.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-card-hover p-8 md:p-10"
            style={{ border: "1px solid #E6EBF0" }}
            data-ocid="appointment.panel"
          >
            {bookingState === "success" ? (
              <div
                className="text-center py-10"
                data-ocid="appointment.success_state"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#D9F1F4" }}
                >
                  <Eye className="w-8 h-8" style={{ color: "#1B8EA6" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#222629" }}
                >
                  Appointment Requested!
                </h3>
                <p className="mb-6" style={{ color: "#6B7785" }}>
                  We'll contact you shortly to confirm your visit.
                </p>
                <Button
                  type="button"
                  onClick={() => setBookingState("idle")}
                  className="rounded-full text-white"
                  style={{ background: "#1B8EA6" }}
                  data-ocid="appointment.secondary_button"
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-name" style={{ color: "#222629" }}>
                      Full Name
                    </Label>
                    <Input
                      id="apt-name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-email" style={{ color: "#222629" }}>
                      Email Address
                    </Label>
                    <Input
                      id="apt-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-phone" style={{ color: "#222629" }}>
                      Phone Number
                    </Label>
                    <Input
                      id="apt-phone"
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-service" style={{ color: "#222629" }}>
                      Service
                    </Label>
                    <Select
                      value={form.service}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, service: v }))
                      }
                    >
                      <SelectTrigger
                        id="apt-service"
                        data-ocid="appointment.select"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Eye Exam">Eye Exam</SelectItem>
                        <SelectItem value="Vision Correction">
                          Vision Correction
                        </SelectItem>
                        <SelectItem value="Laser Surgery">
                          Laser Surgery
                        </SelectItem>
                        <SelectItem value="Pediatric Care">
                          Pediatric Care
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-date" style={{ color: "#222629" }}>
                      Preferred Date
                    </Label>
                    <Input
                      id="apt-date"
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, date: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="apt-time" style={{ color: "#222629" }}>
                      Preferred Time
                    </Label>
                    <Input
                      id="apt-time"
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, time: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={bookingState === "loading"}
                    className="rounded-full font-semibold px-12 text-white"
                    style={{ background: "#1B8EA6" }}
                    data-ocid="appointment.submit_button"
                  >
                    {bookingState === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20"
        style={{ background: "#F6F8FA" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#222629" }}
          >
            What Our Patients Say
          </h2>
          <p className="text-base mb-12" style={{ color: "#6B7785" }}>
            Real stories from real patients who trust ClearVision for their eye
            health.
          </p>

          <div
            className="relative bg-white rounded-2xl shadow-card p-8 md:p-12"
            style={{ border: "1px solid #E6EBF0" }}
            data-ocid="testimonials.panel"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="text-4xl font-serif mb-4 leading-none"
                  style={{ color: "#1B8EA6" }}
                >
                  &ldquo;
                </div>
                <StarRating count={TESTIMONIALS[testimonialIdx].rating} />
                <p
                  className="text-lg font-medium leading-relaxed mb-6"
                  style={{ color: "#222629" }}
                >
                  {TESTIMONIALS[testimonialIdx].quote}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1B8EA6" }}
                >
                  — {TESTIMONIALS[testimonialIdx].author}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "#D9F1F4", color: "#1B8EA6" }}
                aria-label="Previous testimonial"
                data-ocid="testimonials.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    type="button"
                    key={t.author}
                    onClick={() => setTestimonialIdx(i)}
                    className="w-2.5 h-2.5 rounded-full transition-colors"
                    style={{
                      background: i === testimonialIdx ? "#1B8EA6" : "#E6EBF0",
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "#D9F1F4", color: "#1B8EA6" }}
                aria-label="Next testimonial"
                data-ocid="testimonials.pagination_next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ background: "#0E5A73" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "#1B8EA6" }}
                >
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">
                  ClearVision
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Providing exceptional eye care with advanced technology and a
                compassionate touch since 2005.
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#1B8EA6" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    1204 Vision Blvd, Suite 305
                    <br />
                    San Francisco, CA 94102
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#1B8EA6" }}
                  />
                  <a
                    href="tel:+14155550100"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    +1 (415) 555-0100
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#1B8EA6" }}
                  />
                  <a
                    href="mailto:hello@clearvision.care"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    hello@clearvision.care
                  </a>
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Office Hours
              </h4>
              <ul className="space-y-2.5">
                {[
                  { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((row) => (
                  <li key={row.day} className="flex justify-between gap-4">
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {row.day}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          row.hours === "Closed"
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(255,255,255,0.9)",
                      }}
                    >
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "#1B8EA6" }} />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Emergency line: 24/7
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              © {year} ClearVision Eye Clinic. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/privacy"
                className="text-xs hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Terms of Service
              </a>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Built with ❤️ using caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/config/company";
import { createWebPageSchema, createBreadcrumbSchema, siteUrl } from "@/config/schema";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: `Contact Milestone Consultancy | Civil Engineering Office Kalyan & MMR`,
      },
      {
        name: "description",
        content: `Connect with Milestone Consultancy in Kalyan, Maharashtra. Call +91 9225112090 or email for highway, civil engineering, and PMC project inquiries.`,
      },
      {
        property: "og:title",
        content: `Contact Milestone Consultancy | Civil Engineering Office Kalyan & MMR`,
      },
      {
        property: "og:description",
        content: `Connect with Milestone Consultancy in Kalyan, Maharashtra. Call +91 9225112090 or email for highway, civil engineering, and PMC project inquiries.`,
      },
      {
        name: "keywords",
        content:
          "Contact Milestone Consultancy, Civil Engineering Office Kalyan, Project Management Consultancy, Engineering Consultancy, Construction Management, Highway Consultancy, Infrastructure Consultancy, Building Consultancy, PMC, Kalyan West, Thane, Mumbai Metropolitan Region, Maharashtra",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteUrl}/contact` },
      { property: "og:image", content: `${siteUrl}/milestone-logo.jpeg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `${company.name} - Contact Project Management Consultancy`,
      },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Contact Milestone Consultancy | Civil Engineering Office Kalyan & MMR`,
      },
      {
        name: "twitter:description",
        content: `Connect with Milestone Consultancy in Kalyan, Maharashtra. Call +91 9225112090 or email for highway, civil engineering, and PMC project inquiries.`,
      },
      { name: "twitter:image", content: `${siteUrl}/milestone-logo.jpeg` },
      {
        name: "twitter:image:alt",
        content: `${company.name} - Contact Project Management Consultancy`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${siteUrl}/contact`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            createWebPageSchema({
              id: "contact",
              url: "https://milestoneconsultancy.in/contact",
              name: `Contact | ${company.name} - Project Management Consultancy`,
              description: `Contact ${company.name}, a project management consultancy and engineering consultancy firm in Kalyan, Maharashtra. Phone: ${company.contact.phone}. Email: ${company.contact.email}.`,
              type: "ContactPage",
            }),

            createBreadcrumbSchema("https://milestoneconsultancy.in/contact", [
              {
                name: "Home",
                item: "https://milestoneconsultancy.in",
              },
              {
                name: "Contact",
                item: "https://milestoneconsultancy.in/contact",
              },
            ]),

            {
              "@type": "ContactPoint",
              "@id": "https://milestoneconsultancy.in#contact-point",
              telephone: company.contact.phone,
              email: company.contact.email,
              contactType: "customer service",
              availableLanguage: ["English", "Hindi", "Marathi"],
              areaServed: "IN",
              url: "https://milestoneconsultancy.in/contact",
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().max(25, "Phone number is too long").optional(),
  subject: z.string().trim().min(2, "Please add a subject").max(200, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  company_hp: z.string().optional(),
});
type ContactForm = z.infer<typeof contactSchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setError("");

    // Bot honeypot check: if filled, silently absorb without consuming EmailJS quota
    if (data.company_hp) {
      setSubmitted(true);
      reset();
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError(
        `Direct form dispatch is being initialized. Please contact our team directly at ${company.contact.email} or call ${company.contact.phone}.`,
      );
      return;
    }

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Not provided",
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitted(true);
      reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Email sending failed:", err);
      setError(
        `Failed to send message. Please contact us directly at ${company.contact.email} or call ${company.contact.phone}.`,
      );
    }
  };

  const cards = [
    {
      icon: Phone,
      label: "Call",
      value: company.contact.phone,
      href: company.contact.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: company.contact.email,
      href: company.contact.emailHref,
    },
    {
      icon: MapPin,
      label: "Visit",
      value: `${company.address.line1}, ${company.address.line2}`,
      href: company.googleMapsUrl,
    },
  ];

  return (
    <SiteLayout>
      <section
        className="pt-16 pb-14 lg:pt-24 lg:pb-20 bg-[color:var(--color-brand-navy)] text-white"
        aria-labelledby="contact-heading"
      >
        <div className="container-page max-w-3xl">
          <span className="eyebrow text-[color:var(--color-brand-orange)]">Contact</span>
          <h1
            id="contact-heading"
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]"
          >
            Let's talk about your next project.
          </h1>
          <p className="mt-6 text-white/75 text-base sm:text-lg max-w-2xl">
            Whether you're planning a new highway, an infrastructure programme or a building project
            — our team would be glad to help.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20" aria-labelledby="contact-cards-heading">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === "Visit" ? "_blank" : undefined}
                rel={c.label === "Visit" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-card p-7 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-orange)]/40 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)] group-hover:bg-[color:var(--color-brand-orange)] group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-5 eyebrow">{c.label}</div>
                <div className="mt-1 font-medium text-[color:var(--color-brand-navy)] break-words">
                  {c.value}
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="pb-24" aria-labelledby="contact-form-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
            <SectionHeader
              eyebrow="Send a Message"
              title="Tell us about your project."
              description="Share a few details and our team will get back to you within one business day."
            />
            {submitted ? (
              <div className="mt-10 rounded-2xl border border-[color:var(--color-brand-orange)]/30 bg-[color:var(--color-brand-orange)]/5 p-6 flex gap-4 items-start">
                <CheckCircle2
                  className="h-6 w-6 text-[color:var(--color-brand-orange)] mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <div className="font-semibold text-[color:var(--color-brand-navy)]">
                    Thank you — your message has been received.
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll respond to your enquiry shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-medium text-[color:var(--color-brand-navy)] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
                {/* Honeypot field for bot spam prevention */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden pointer-events-none opacity-0 h-0 w-0 absolute"
                  {...register("company_hp")}
                />
                {error && (
                  <div
                    className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" className="mt-2" {...register("name")} />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-2" {...register("email")} />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" className="mt-2" {...register("phone")} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-2" {...register("subject")} />
                    {errors.subject && (
                      <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" className="mt-2 min-h-32" {...register("message")} />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-12 w-full sm:w-auto sm:px-8"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-[color:var(--color-brand-navy)] text-white p-8">
              <div className="flex items-center gap-3">
                <Clock
                  className="h-5 w-5 text-[color:var(--color-brand-orange)]"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-semibold">Working Hours</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {company.workingHours.map((w) => (
                  <li
                    key={w.days}
                    className="flex justify-between border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="text-white/80">{w.days}</span>
                    <span className="font-medium">{w.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[280px] bg-muted">
              <iframe
                title="Milestone Consultancy location - Kalyan, Maharashtra"
                src={company.googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

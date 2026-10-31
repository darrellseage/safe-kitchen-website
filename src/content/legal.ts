/**
 * Legal page drafts. Plain English, UK GDPR-oriented. They must be reviewed by
 * a solicitor before launch (app DECISIONS.md O-004). Anything in [square
 * brackets] is a placeholder the owner must supply; it is highlighted on the page.
 */
import { siteConfig } from "@/config/site";

const c = siteConfig.company;
export const company = {
  name: c?.legalName ?? "[Company or trading name]",
  address: c?.address ?? "[Registered address]",
  number: c?.companyNumber ?? "[Company number, if a limited company]",
  ico: c?.icoNumber ?? "[ICO registration number]",
  email: c?.email ?? "[Privacy contact email]",
};

export type LegalSection = { heading: string; body: string[] };
export type LegalPage = { title: string; updated: string; intro: string; sections: LegalSection[] };

export const legalDraftNotice = "Draft: to be reviewed by a solicitor before Safe Kitchen launches. Text in [square brackets] still needs completing.";

export const privacy: LegalPage = {
  title: "Privacy notice",
  updated: "Draft, 31 October 2026",
  intro: `This notice explains how ${siteConfig.name} uses the information you give us through this website.`,
  sections: [
    { heading: "Who we are", body: [`${company.name} (“we”) runs ${siteConfig.name}. Our address is ${company.address}. Company number: ${company.number}. ICO registration: ${company.ico}.`, `For anything about your data, email ${company.email}.`] },
    {
      heading: "What we collect",
      body: [
        "When you join early access, request a demo or book a call, we collect your name, email address, business name, type of business, number of sites, what you asked for, any message you write, the call time you chose, and whether you ticked the box for product updates.",
        "To protect the form from spam we check how quickly it was filled in and how many times it was sent from your connection. We use your IP address for that check but we don’t store it with your enquiry.",
      ],
    },
    {
      heading: "Why we use it, and our lawful basis",
      body: [
        "To reply to your enquiry, arrange a demo or hold your call: our legitimate interest in responding to people who contact us.",
        "To send you product updates, only if you tick the box: your consent. You can withdraw it at any time with the unsubscribe link or by emailing us.",
        "To keep the website and form secure and free of spam: our legitimate interest in protecting our service.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We use trusted service providers who process data on our behalf: Vercel (website hosting), Supabase (secure database, hosted in London), Cloudflare (spam protection with Turnstile) and Resend (email). They may only use your data to provide their service to us.",
        "We never sell your data or share it for other companies’ marketing.",
      ],
    },
    { heading: "How long we keep it", body: ["We keep enquiries for [retention period to confirm], then delete them, unless you become a customer, in which case your customer agreement explains what we keep."] },
    {
      heading: "Your rights",
      body: [
        "You can ask to see, correct or delete your data, object to how we use it, or ask us to limit its use. Email us and we’ll reply within one month.",
        "If you’re unhappy with how we’ve handled your data, you can complain to the Information Commissioner’s Office (ico.org.uk), though we’d appreciate the chance to put it right first.",
      ],
    },
  ],
};

export const cookies: LegalPage = {
  title: "Cookies",
  updated: "Draft, 31 October 2026",
  intro: "We keep cookies to a minimum.",
  sections: [
    { heading: "Cookies we use now", body: ["This website doesn’t use advertising or tracking cookies.", "When the spam protection on our form is switched on, Cloudflare Turnstile may use strictly necessary data in your browser to tell people from bots. This is needed for the form to work safely, so it doesn’t need your consent."] },
    { heading: "Analytics", body: ["We plan to use Google Analytics to understand how people use the site. It will only run if you choose “Accept” in our cookie banner, and you can change your choice at any time. Until then, no analytics cookies are set."] },
    { heading: "Questions", body: [`Email ${company.email}.`] },
  ],
};

export const terms: LegalPage = {
  title: "Website terms of use",
  updated: "Draft, 31 October 2026",
  intro: `These terms cover your use of the ${siteConfig.name} website. Separate terms will cover the ${siteConfig.name} service itself.`,
  sections: [
    { heading: "About the information on this site", body: [`We work hard to keep this site accurate, but it describes a product that is still being developed. Features marked as in development, planned or our vision may change or may not be released.`, "Demonstrations, figures and calculators on this site are illustrative. They aren’t food safety guidance, legal advice or a promise of any saving or outcome."] },
    { heading: "Food safety", body: [`Your business is always responsible for its own food safety. ${siteConfig.name} is a tool that helps you keep records and run your kitchen; it doesn’t replace your food safety management system, your own judgement or professional advice.`, `${siteConfig.name} is not affiliated with or endorsed by the Food Standards Agency or any local authority.`] },
    { heading: "Using the site", body: ["Please don’t misuse the site, for example by trying to break its security, sending spam through the form or copying its content for commercial use without permission."] },
    { heading: "Our liability", body: ["[To be completed with legal advice.]"] },
    { heading: "Law", body: ["These terms are governed by the law of England and Wales."] },
  ],
};

export const accessibility: LegalPage = {
  title: "Accessibility statement",
  updated: "Draft, 31 October 2026",
  intro: `We want everyone to be able to use the ${siteConfig.name} website, including people using screen readers, keyboards, magnification or other assistive technology.`,
  sections: [
    { heading: "Our standard", body: ["We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA."] },
    {
      heading: "What we’ve done",
      body: [
        "Every part of the site can be used with a keyboard, with a visible focus outline.",
        "Buttons and controls are large enough to use with gloves or on a small phone.",
        "Animations switch off if you’ve asked your device to reduce motion, and nothing is only shown through animation.",
        "Colours are checked for contrast, and colour is never the only way information is shown.",
        "Forms have clear labels, and errors are listed at the top with links to each field.",
      ],
    },
    { heading: "Known issues", body: ["We’re still testing with screen readers and will list anything we find here, with a date to fix it."] },
    { heading: "Tell us about a problem", body: [`If something doesn’t work for you, email ${company.email} and we’ll help. We aim to reply within five working days.`] },
  ],
};

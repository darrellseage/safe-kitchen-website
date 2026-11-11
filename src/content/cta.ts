import { releaseStage } from "@/config/features";
import { siteConfig } from "@/config/site";
import { routes } from "./site-map";

/**
 * The site's main call to action. Before launch it registers interest (free,
 * no card). Once the site is in its "launched" stage and the app's sign-up
 * address is set, the same buttons start a subscription in the app. No
 * payment or account is ever created on this website.
 */
const launched = releaseStage === "launched" && siteConfig.appSignUpUrl !== null;

export const cta = {
  href: launched ? siteConfig.appSignUpUrl! : routes.earlyAccess,
  label: launched ? "Start your subscription" : "Get early access",
  shortLabel: launched ? "Subscribe" : "Early access",
  note: launched ? "Cancel any time. No set-up fees." : "Early access is free. No card. No commitment.",
} as const;

/** One notice on every page until launch, so launch-ready wording never misleads a preview reader. */
export const preLaunchNotice =
  releaseStage === "launched"
    ? null
    : `Private preview. ${siteConfig.name} is being built and tested with pilot kitchens and isn’t available to customers yet. Screens show sample data.`;

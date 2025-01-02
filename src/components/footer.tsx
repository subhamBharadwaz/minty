import { siteConfig } from "@/config/site";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { LeafIcon, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-900 py-6 min-h-[200px] mt-auto">
      <div className="container space-y-20 ">
        <div className="space-y-8 xl:col-span-2">
          <div className="space-y-10">
            <div className="flex items-center gap-x-2">
              <LeafIcon className="size-6 fill-primary stroke-foreground" />
              <h3 className="text-md text-muted-foreground lg:text-lg">
                Minty - Finance Tracker
              </h3>
            </div>
            <div className="flex items-center gap-x-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-foreground/20 active:bg-foreground/30"
              >
                <span className="sr-only">Github</span>
                <GitHubLogoIcon className="size-5" />
              </a>
              <div className="h-8 border-l border-muted-foreground/50" />

              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-foreground/20 active:bg-foreground/30"
              >
                <span className="sr-only">Twitter</span>
                <X className="size-5" />
              </a>
              <div className="h-8 border-l border-muted-foreground/50" />

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-foreground/20 active:bg-foreground/30"
              >
                <span className="sr-only">Linkedin</span>
                <LinkedInLogoIcon className="size-5" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3>Product</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="/#features"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="/#pricing"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3>Company</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="/"
                    >
                      About us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3>Developers</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href={siteConfig.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3>Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="/privacy"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-accent-foreground"
                      href="/terms"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t  pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} minty.subhambharadwaz.com
          </p>
        </div>
      </div>{" "}
    </footer>
  );
};

export default Footer;

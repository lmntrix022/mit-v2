import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";  // Importation du composant Image

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        {/* Logo dans le Footer avec Image de Next.js */}
        <div className="flex items-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link href="/" className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400">
            <Image
              src="/img/misc.png"  // Chemin vers votre logo dans le dossier public
              alt="Logo"
              width={48}         // Largeur du logo
              height={48}        // Hauteur du logo
              className="sm:w-12 sm:h-12"  // Ajustement pour les écrans plus larges
              priority={true}    // Priorité de chargement
            />
            
          </Link>
          
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>

        {/* Navigation */}
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden text-xs rounded px-3 py-1 font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400"
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span className="text-4xl font-thin leading-[0] text-slate-400" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on GitHub"}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.twitter_link) && (
            <PrismicNextLink
              field={settings.data.twitter_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on Twitter"}
            >
              <FaTwitter />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}

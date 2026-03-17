// components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Instagram, Youtube } from 'lucide-react'
import { footerLinks } from '../../data/site.data.js'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(255,255,255,0.05)] mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="font-heading font-700 text-white text-base">
                UNFILTERED<span className="text-primary">GADGETS</span>
              </span>
            </Link>
            <p className="text-[#555] text-xs font-body leading-relaxed mb-5">
              Building a world where you don't need to read between the lines. Just great tech, honestly presented.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 bg-[#1A1A1A] hover:bg-primary border border-[rgba(255,255,255,0.06)] rounded flex items-center justify-center text-[#666] hover:text-white transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-600 text-white text-sm mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[#666] hover:text-white text-xs font-body transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-600 text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[#666] hover:text-white text-xs font-body transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-600 text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[#666] hover:text-white text-xs font-body transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-600 text-white text-sm mb-4">Newsletter</h4>
            <p className="text-[#555] text-xs font-body mb-3">Get deals before everyone else.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-[#111] border border-[rgba(255,255,255,0.08)] text-white text-xs font-body px-3 py-2 rounded-2xl focus:outline-none focus:border-primary/50 placeholder-[#444] w-full"
              />
              <button className="bg-primary hover:bg-primary-dark text-white text-xs font-body font-600 py-2 rounded-2xl transition-colors w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.05)] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#444] text-xs font-body">
            © 2026 UnfilteredGadgets. All rights reserved. No gimmicks, ever.
          </p>
          <p className="text-[#333] text-xs font-mono">
            Made with ❤️ for real gadget lovers
          </p>
        </div>
      </div>
    </footer>
  )
}

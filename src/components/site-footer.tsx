import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
export function SiteFooter() {
  return (
    <footer className="bg-muted mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand-primary h-8 w-8" />
              <span className="text-xl font-display font-bold">ChicHaven</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Moda premium e acessórios para o indivíduo moderno. Qualidade artesanal e design atemporal.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Contato</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span>R ANA MACEDO 233, Bairro BARROSO, FORTALEZA-CE, CEP 60.863-515</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                <span>(85) 92002-4091</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                <span>OADRIELE860@GMAIL.COM</span>
              </li>
            </ul>
          </div>
          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Explorar</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {['Novidades', 'Mais Vendidos', 'Coleções Exclusivas', 'Guia de Tamanhos', 'Envio e Entrega'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-brand-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-brand-primary transition-colors">Termos de Serviço</Link></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground space-y-2">
          <p>© 2024 ChicHaven Atelier LLC. Todos os direitos reservados.</p>
          <p>CNPJ: 61.528.561/0001-52 | Razão Social: 61.528.561 ADRIELE ALVES DE OLIVEIRA ALENCAR</p>
        </div>
      </div>
    </footer>
  );
}
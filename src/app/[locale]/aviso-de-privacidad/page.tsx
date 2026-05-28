import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Aviso de privacidad — versión español.
 * Válido solo en `/es/aviso-de-privacidad`. 404 si se accede a `/en/aviso-de-privacidad`.
 *
 * Marcado `noindex` hasta validación legal calificada antes de outreach formal.
 * Traducción al español de la misma política US (CCPA + GDPR-friendly) en `/en/privacy`.
 */

export const metadata: Metadata = {
  title: 'Aviso de privacidad — Vizcaia',
  description:
    'Cómo Vizcaia Technologies trata los datos personales recolectados a través de vizcaia.com.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function AvisoPrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'es') notFound();

  return (
    <article className="px-4 sm:px-6 lg:px-8 py-24 max-w-3xl mx-auto">
      <div className="mb-16">
        <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-4">
          Legal · Actualizado 27/05/2026
        </p>
        <h1 className="font-display font-medium tracking-tight-3 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-balance">
          Aviso de privacidad
        </h1>
        <p className="mt-6 font-sans text-base sm:text-lg text-paper opacity-70 leading-relaxed">
          Este aviso explica cómo Vizcaia Technologies recolecta, usa y protege la información que
          envías a través de <strong>vizcaia.com</strong>. Buscamos lenguaje claro; si algo no es
          claro, escríbenos a{' '}
          <a
            className="text-signal hover:text-signal-2 underline underline-offset-2"
            href="mailto:privacidad@vizcaia.com"
          >
            privacidad@vizcaia.com
          </a>
          .
        </p>
      </div>

      <Section title="1. Quiénes somos">
        <p>
          Vizcaia Technologies es un estudio de software con sede en Miami, Florida (Estados
          Unidos). Construimos AI agents y software de producción para equipos de ingeniería y
          operaciones, atendiendo principalmente clientes en Estados Unidos.
        </p>
        <p>
          Para preguntas sobre privacidad o ejercicio de derechos, contáctanos en{' '}
          <a className="text-signal" href="mailto:privacidad@vizcaia.com">
            privacidad@vizcaia.com
          </a>
          .
        </p>
      </Section>

      <Section title="2. Datos que recolectamos">
        <p>Cuando envías el formulario de contacto en vizcaia.com, recibimos:</p>
        <ul>
          <li>Tu nombre</li>
          <li>Tu correo electrónico</li>
          <li>Tu empresa (opcional)</li>
          <li>El mensaje que escribiste</li>
          <li>Cómo nos conociste (opcional)</li>
          <li>La dirección IP del envío (para limitar abuso del formulario)</li>
        </ul>
        <p>
          <strong>No</strong> usamos cookies de tracking. Si activamos analítica, usamos una
          solución sin cookies (Cloudflare Web Analytics) que no identifica visitantes individuales.
        </p>
      </Section>

      <Section title="3. Por qué los recolectamos">
        <p>
          El único propósito por el cual recolectamos esta información es responder a tu consulta
          comercial.
        </p>
        <p>
          No usamos los datos para publicidad. No los enriquecemos con datos de terceros. No los
          vendemos. No los compartimos fuera de Vizcaia.
        </p>
      </Section>

      <Section title="4. Cuánto tiempo los conservamos">
        <p>
          Leads activos: conservamos los datos mientras dura la conversación, más 12 meses
          adicionales para referencia.
        </p>
        <p>
          Leads cerrados (declinados, no encajan): archivados 6 meses después del cierre y
          eliminados tras un máximo de 24 meses totales.
        </p>
        <p>Puedes pedirnos eliminar tus datos antes — ver "Tus derechos" abajo.</p>
      </Section>

      <Section title="5. Dónde residen los datos">
        <p>Los datos del formulario se procesan y almacenan en infraestructura propia:</p>
        <ul>
          <li>Servidor en Hetzner (Alemania, jurisdicción UE)</li>
          <li>Copia de correo entregada vía Google Workspace (Gmail SMTP)</li>
          <li>Registro de lead creado en nuestro Outline self-hosted (mismo servidor)</li>
        </ul>
      </Section>

      <Section title="6. Tus derechos (CCPA + GDPR)">
        <p>Tienes derecho a:</p>
        <ul>
          <li>
            <strong>Acceder</strong> a los datos personales que tenemos sobre ti.
          </li>
          <li>
            <strong>Corregir</strong> información inexacta.
          </li>
          <li>
            <strong>Eliminar</strong> tus datos ("derecho al olvido").
          </li>
          <li>
            <strong>Oponerte o restringir</strong> el tratamiento.
          </li>
          <li>
            <strong>Recibir una copia</strong> de tus datos en formato legible por máquina
            (portabilidad).
          </li>
          <li>
            <strong>Presentar una queja</strong> ante una autoridad supervisora (tu autoridad local
            de protección de datos en la UE, el Fiscal General de California para residentes de
            California).
          </li>
        </ul>
        <p>
          No venderemos, alquilaremos ni compartiremos tu información personal con terceros para sus
          propósitos de marketing. No usamos tus datos para "publicidad comportamental
          cross-context" según la define CPRA.
        </p>
      </Section>

      <Section title="7. Cómo ejercer tus derechos">
        <p>
          Envía un correo a{' '}
          <a className="text-signal" href="mailto:privacidad@vizcaia.com">
            privacidad@vizcaia.com
          </a>{' '}
          desde la dirección que usaste en el formulario. Respondemos dentro de 30 días.
        </p>
        <p>
          No cobramos por solicitudes razonables. Si una petición es excesiva o repetitiva, podemos
          cobrar un cargo administrativo mínimo o declinar.
        </p>
      </Section>

      <Section title="8. Seguridad">
        <p>
          Usamos HTTPS para toda transmisión. Nuestros servidores están endurecidos (acceso SSH solo
          por llave, firewall, actualizaciones automáticas de seguridad). No requerimos contraseñas
          de quienes envían el formulario — no hay cuenta que comprometer.
        </p>
        <p>
          Ningún sistema es 100% seguro. Notificaremos a los usuarios afectados dentro de 72 horas
          si detectamos una vulneración que afecte sus datos.
        </p>
      </Section>

      <Section title="9. Privacidad de menores">
        <p>
          vizcaia.com está dirigido a audiencia B2B (empresas, tomadores de decisiones). No
          recolectamos a sabiendas datos de personas menores de 16 años. Si crees que un menor envió
          el formulario, contáctanos y eliminaremos los datos.
        </p>
      </Section>

      <Section title="10. Cambios a este aviso">
        <p>
          Actualizaremos la fecha "Actualizado" en la parte superior cuando hagamos cambios. Cambios
          materiales se comunicarán a leads existentes vía correo electrónico.
        </p>
      </Section>

      <Section title="11. Contacto">
        <p>
          Vizcaia Technologies <br />
          Miami, FL · Estados Unidos <br />
          <a className="text-signal" href="mailto:privacidad@vizcaia.com">
            privacidad@vizcaia.com
          </a>
        </p>
      </Section>

      <p className="mt-16 pt-8 border-t border-rule-dark font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-65">
        Esta es una plantilla v1. La actualizaremos tras revisión legal calificada antes de outreach
        comercial formal.
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight-3 mb-4 text-paper">
        {title}
      </h2>
      <div className="space-y-4 font-sans text-base leading-relaxed text-paper opacity-80 [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-paper [&_strong]:opacity-100">
        {children}
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Aviso de privacidad — versión español.
 * Válido solo en `/es/aviso-de-privacidad`. 404 si se accede a `/en/aviso-de-privacidad`.
 *
 * Marcado `noindex` hasta validación con abogado colombiano antes de outreach formal.
 * Cubre Ley 1581 de 2012 (Habeas Data Colombia).
 *
 * Versión inglés en `/en/privacy` (CCPA + GDPR).
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
          Legal · Actualizado 25/05/2026
        </p>
        <h1 className="font-display font-medium tracking-tight-3 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-balance">
          Aviso de privacidad
        </h1>
        <p className="mt-6 font-sans text-base sm:text-lg text-paper opacity-70 leading-relaxed">
          Este aviso explica cómo Vizcaia Technologies recolecta, usa y protege la información que
          envías a través de <strong>vizcaia.com</strong>, conforme a la Ley 1581 de 2012 (Régimen
          General de Protección de Datos) y el Decreto 1377 de 2013 de Colombia. Si algo no es
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

      <Section title="1. Responsable del tratamiento">
        <p>
          Vizcaia Technologies, estudio de software con sede operativa en Casanare, Colombia.
          Atendemos clientes a nivel internacional.
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

      <Section title="3. Finalidad del tratamiento">
        <p>
          El único propósito por el cual recolectamos esta información es responder a tu consulta
          comercial.
        </p>
        <p>
          No usamos los datos para publicidad. No los enriquecemos con datos de terceros. No los
          vendemos. No los compartimos fuera de Vizcaia.
        </p>
      </Section>

      <Section title="4. Tiempo de conservación">
        <p>
          Leads activos: conservamos los datos mientras dura la conversación, más 12 meses
          adicionales para referencia.
        </p>
        <p>
          Leads cerrados (declinados, no encajan): archivados 6 meses después del cierre y
          eliminados tras un máximo de 24 meses totales.
        </p>
        <p>Puedes pedirnos eliminar tus datos antes — ver "Derechos del titular" abajo.</p>
      </Section>

      <Section title="5. Dónde residen los datos">
        <p>Los datos del formulario se procesan y almacenan en infraestructura propia:</p>
        <ul>
          <li>Servidor en Hetzner (Alemania, jurisdicción UE)</li>
          <li>Copia de correo entregada vía Google Workspace (Gmail SMTP)</li>
          <li>Registro de lead creado en nuestro Outline self-hosted (mismo servidor)</li>
        </ul>
        <p>
          Esto constituye una transferencia internacional de datos a Alemania, país con nivel
          adecuado de protección según la SIC.
        </p>
      </Section>

      <Section title="6. Derechos del titular (Ley 1581 de 2012)">
        <p>Como titular de los datos, tienes derecho a:</p>
        <ul>
          <li>
            <strong>Conocer, actualizar y rectificar</strong> tus datos personales.
          </li>
          <li>
            <strong>Solicitar prueba</strong> de la autorización otorgada.
          </li>
          <li>
            <strong>Ser informado</strong> sobre el uso que se le ha dado a tus datos.
          </li>
          <li>
            <strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC)
            por infracciones a la ley.
          </li>
          <li>
            <strong>Revocar la autorización</strong> y/o solicitar la supresión del dato.
          </li>
          <li>
            <strong>Acceder gratuitamente</strong> a tus datos que hayan sido objeto de tratamiento.
          </li>
        </ul>
      </Section>

      <Section title="7. Cómo ejercer tus derechos">
        <p>
          Envía un correo a{' '}
          <a className="text-signal" href="mailto:privacidad@vizcaia.com">
            privacidad@vizcaia.com
          </a>{' '}
          desde el correo que usaste en el formulario. Respondemos dentro de los 15 días hábiles
          establecidos por la ley.
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
          Casanare, Colombia <br />
          <a className="text-signal" href="mailto:privacidad@vizcaia.com">
            privacidad@vizcaia.com
          </a>
        </p>
      </Section>

      <p className="mt-16 pt-8 border-t border-rule-dark font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-40">
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

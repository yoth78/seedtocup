interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  alignment = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`${alignment === 'center' ? 'text-center' : 'text-left'} mb-12 lg:mb-16`}>
      {tag && (
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${
            light ? 'text-coffee-accent' : 'text-brand-blue'
          }`}
        >
          {tag}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 ${
          light ? 'text-white' : 'text-coffee-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base lg:text-lg leading-relaxed max-w-2xl ${
            alignment === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-coffee-light/80' : 'text-text-medium'}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`section-divider mt-6 ${alignment === 'center' ? '' : '!mx-0'}`}
      />
    </div>
  );
}

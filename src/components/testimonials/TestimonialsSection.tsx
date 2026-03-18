import { Icon } from "@/components/ui/Icon";

export function TestimonialsSection() {
  return (
    <section className="py-24 border-t border-white/5 relative z-10 bg-[#050505]">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div className="mb-12">
          <span className="text-sm font-medium text-green-300">Testimonials</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-white">
            Real stories from learners who finally escaped the YouTube rabbit hole.
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 border-white/10 bg-white/5">
            <span className="inline-flex items-center -space-x-2">
              <img
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 1"
              />
              <img
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 2"
              />
              <img
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 3"
              />
              <img
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 4"
              />
            </span>
            <span className="ml-2 inline-flex items-center gap-1 text-sm text-neutral-300">
              <Icon icon="lucide:star" className="w-4 h-4 text-amber-300" />
              <Icon icon="lucide:star" className="w-4 h-4 text-amber-300" />
              <Icon icon="lucide:star" className="w-4 h-4 text-amber-300" />
              <Icon icon="lucide:star" className="w-4 h-4 text-amber-300" />
              <Icon icon="lucide:star-half" className="w-4 h-4 text-amber-300" />
              <span className="ml-1">4.9/5 • 2,431 learners</span>
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 overflow-hidden md:grid-cols-3 py-12 gap-x-6 gap-y-6"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent, black 45%, black 45%, transparent)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent, black 45%, black 45%, transparent)",
          }}
        >
          {/* Column 1 - Scroll Up */}
          <div className="overflow-hidden">
            <div data-scroll-column="1" className="space-y-6">
              <TestimonialCard
                quote="Pathwise turned my chaotic YouTube watch later list into a clear roadmap. I finally know what to watch next and why."
                name="Aisha Green"
                role="Self-taught Frontend Developer"
                avatar="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Instead of bouncing between random tutorials, I have a structured path for React and Node. It feels like a real course, but free."
                name="Priya Patel"
                role="Product Design Student"
                avatar="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="I used to waste evenings searching for 'the right video'. Now I open Pathwise and just continue where I left off."
                name="Jonas Weber"
                role="Career-switching Backend Engineer"
                avatar="https://images.unsplash.com/photo-1546456073-6712f79251bb?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="Pathwise turned my chaotic YouTube watch later list into a clear roadmap. I finally know what to watch next and why."
                name="Aisha Green"
                role="Self-taught Frontend Developer"
                avatar="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Column 2 - Scroll Down */}
          <div className="overflow-hidden">
            <div data-scroll-column="2" className="space-y-6">
              <TestimonialCard
                quote="Pathwise curated a full-stack playlist that actually builds on itself. No more 4-hour videos that jump three levels ahead."
                name="Michael Chen"
                role="Junior Full-Stack Developer"
                avatar="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="As a bootstrapped founder, I don't have time to vet tutorials. Pathwise gave me a vetted roadmap for shipping my first SaaS."
                name="Rachel Adams"
                role="Indie SaaS Founder"
                avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="I use Pathwise with my students. They get a clear YouTube path for each topic instead of a random list of 'best tutorials'."
                name="Liam O'Connor"
                role="University Instructor"
                avatar="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="Pathwise curated a full-stack playlist that actually builds on itself. No more 4-hour videos that jump three levels ahead."
                name="Michael Chen"
                role="Junior Full-Stack Developer"
                avatar="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Column 3 - Scroll Up */}
          <div className="overflow-hidden">
            <div data-scroll-column="3" className="space-y-6">
              <TestimonialCard
                quote="The AI-generated paths feel like a syllabus a senior engineer would design for me. I just follow it day by day."
                name="Carlos Rivera"
                role="Aspiring Mobile Developer"
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Having progress tracking on top of YouTube is a game changer. I can see exactly how far I am into each path."
                name="Sofia Martinez"
                role="Data Analyst Upskilling to ML"
                avatar="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Pathwise gave structure to the channels I already love. Now every video fits into a bigger learning journey."
                name="Noah Bennett"
                role="Frontend Engineer"
                avatar="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="The AI-generated paths feel like a syllabus a senior engineer would design for me. I just follow it day by day."
                name="Carlos Rivera"
                role="Aspiring Mobile Developer"
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border p-6 border-white/10 bg-neutral-900/70">
      <blockquote className="text-[16px] sm:text-[18px] text-neutral-100">
        <span className="inline-flex items-center gap-2">
          <Icon icon="lucide:quote" className="w-4 h-4 text-neutral-400" />
          {`"${quote}"`}
        </span>
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
          src={avatar}
          alt={name}
        />
        <div>
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-xs text-neutral-400">{role}</div>
        </div>
      </div>
    </article>
  );
}


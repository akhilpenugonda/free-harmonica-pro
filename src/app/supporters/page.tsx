import { SUPPORTERS, getTotalCoffees } from "@/lib/supporters";
import { siteConfig } from "@/lib/siteConfig";

export default function SupportersPage() {
  const totalCoffees = getTotalCoffees();
  const totalSupporters = SUPPORTERS.length;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Hero */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="text-5xl mb-4">&#9749;</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Our <span className="gradient-text">Supporters</span>
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            {siteConfig.name} is 100% free — no ads, no subscriptions, no
            limits. These amazing people keep it that way.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12 animate-fade-in">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-accent">{totalSupporters}</div>
            <div className="text-sm text-muted mt-1">
              {totalSupporters === 1 ? "Supporter" : "Supporters"}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-accent">{totalCoffees}</div>
            <div className="text-sm text-muted mt-1">
              {totalCoffees === 1 ? "Coffee" : "Coffees"}
            </div>
          </div>
        </div>

        {/* Supporter Cards */}
        <div className="mb-12">
          {SUPPORTERS.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUPPORTERS.map((supporter, idx) => (
                <div
                  key={idx}
                  className="glass rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                      {supporter.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{supporter.name}</div>
                      <div className="text-xs text-muted">
                        {new Date(supporter.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  {supporter.message && (
                    <p className="text-sm text-muted/80 italic mb-3">
                      &ldquo;{supporter.message}&rdquo;
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <span>&#9749;</span>
                    <span>
                      {supporter.coffees}{" "}
                      {supporter.coffees === 1 ? "coffee" : "coffees"}
                    </span>
                  </div>
                </div>
              ))}

              {/* "Be Next" placeholder card */}
              <a
                href={siteConfig.buyMeACoffee}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-6 border-2 border-dashed border-card-border hover:border-accent/40 transition-all group flex flex-col items-center justify-center text-center min-h-[140px]"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  &#10024;
                </div>
                <div className="font-semibold text-muted group-hover:text-foreground transition-colors">
                  Your Name Here
                </div>
                <div className="text-xs text-muted/60 mt-1">
                  Be among the first supporters
                </div>
              </a>
            </div>
          ) : (
            <div className="glass rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">&#10024;</div>
              <h2 className="text-xl font-bold mb-2">Be the First!</h2>
              <p className="text-muted max-w-md mx-auto">
                No supporters yet — you could be the very first person to help
                keep {siteConfig.name} free for everyone.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 sm:p-10 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-3">
            Help Keep {siteConfig.name} Free
          </h2>
          <p className="text-muted max-w-md mx-auto mb-6">
            Every coffee fuels new songs, better features, and keeps this
            platform completely free for harmonica players everywhere.
          </p>
          <a
            href={siteConfig.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              className="h-14"
            />
          </a>
          <p className="text-xs text-muted/50 mt-4">
            Your name and message will appear on this page.
          </p>
        </div>
      </div>
    </div>
  );
}

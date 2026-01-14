import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, ChevronDown, Verified, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    avatar: null,
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely love this product!",
    content: "I've been using this serum for 3 weeks now and can already see a visible difference in my skin. My dark spots are fading and my skin has a beautiful glow. The texture is lightweight and absorbs quickly. Highly recommend!",
    helpful: 45,
    notHelpful: 2,
    images: [],
  },
  {
    id: 2,
    name: "Emily R.",
    avatar: null,
    verified: true,
    rating: 5,
    date: "1 month ago",
    title: "Best vitamin C serum I've tried",
    content: "After trying countless vitamin C serums, this one is by far the best. No irritation, no sticky residue, and amazing results. My skin looks brighter and more even-toned.",
    helpful: 32,
    notHelpful: 1,
    images: [],
  },
  {
    id: 3,
    name: "Jessica L.",
    avatar: null,
    verified: true,
    rating: 4,
    date: "1 month ago",
    title: "Great product, slightly pricey",
    content: "The product works wonderfully and I've seen real improvements in my skin texture. Taking off one star only because of the price point, but the quality justifies it.",
    helpful: 28,
    notHelpful: 3,
    images: [],
  },
  {
    id: 4,
    name: "Amanda K.",
    avatar: null,
    verified: true,
    rating: 5,
    date: "2 months ago",
    title: "Holy grail status!",
    content: "This serum has become a staple in my skincare routine. I love how it layers under my moisturizer and sunscreen. My skin has never looked better!",
    helpful: 56,
    notHelpful: 0,
    images: [],
  },
];

const ratingBreakdown = {
  5: 78,
  4: 15,
  3: 5,
  2: 1,
  1: 1,
};

const ReviewsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("helpful");

  const averageRating = 4.9;
  const totalReviews = 234;

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="mt-16 md:mt-24 border-t border-border pt-12">
      {/* Header */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-accent text-accent' : 'text-muted'}`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">{averageRating}</span>
            <span className="text-muted-foreground">based on {totalReviews} reviews</span>
          </div>
        </div>

        <Button variant="premium" className="gap-2">
          Write a Review
        </Button>
      </div>

      {/* Rating Breakdown & Reviews Grid */}
      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        {/* Rating Breakdown */}
        <div className="rounded-2xl border border-border bg-muted/30 p-6 h-fit">
          <h3 className="font-semibold text-foreground mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-foreground">{rating}</span>
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                </div>
                <Progress 
                  value={ratingBreakdown[rating as keyof typeof ratingBreakdown]} 
                  className="h-2 flex-1" 
                />
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {ratingBreakdown[rating as keyof typeof ratingBreakdown]}%
                </span>
              </div>
            ))}
          </div>

          {/* Review Highlights */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Customers love</h4>
            <div className="flex flex-wrap gap-2">
              {["Brightening", "Lightweight", "Fast absorbing", "No irritation", "Visible results"].map((tag) => (
                <span 
                  key={tag} 
                  className="rounded-full bg-secondary-light px-3 py-1 text-xs font-medium text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div>
          {/* Sort */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">Showing {displayedReviews.length} of {reviews.length} reviews</span>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              Sort by: Most Helpful
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Review Cards */}
          <div className="space-y-6">
            {displayedReviews.map((review, index) => (
              <div 
                key={review.id} 
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{review.name}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-secondary">
                            <Verified className="h-3.5 w-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{review.content}</p>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-4 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Was this helpful?</span>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-secondary">
                    <ThumbsUp className="h-4 w-4" />
                    {review.helpful}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive">
                    <ThumbsDown className="h-4 w-4" />
                    {review.notHelpful}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {!showAll && reviews.length > 3 && (
            <Button 
              variant="outline" 
              className="w-full mt-6 gap-2"
              onClick={() => setShowAll(true)}
            >
              Load More Reviews
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, CheckCircle, Plus, X, MessageSquare } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS_DATA } from '../data/reviewsData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Review Form state
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newService, setNewService] = useState('Instagram Followers');
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLikeReview = (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likesCount: r.likesCount + 1 } : r))
    );
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText || !newTitle) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      name: newName,
      username: newUsername.startsWith('@') ? newUsername : `@${newUsername || 'creator'}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: newRating,
      date: 'Just now',
      service: newService,
      title: newTitle,
      text: newText,
      likesCount: 1,
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddReviewModal(false);
      setNewName('');
      setNewUsername('');
      setNewTitle('');
      setNewText('');
    }, 1500);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'followers') return r.service.toLowerCase().includes('follower');
    if (activeFilter === 'likes') return r.service.toLowerCase().includes('like');
    if (activeFilter === 'views') return r.service.toLowerCase().includes('view');
    return true;
  });

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full mb-3 border border-orange-200/60">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> Verified Customer Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Real Reviews from Real Creators
            </h2>
          </div>

          <button
            id="write-review-open-btn"
            onClick={() => setShowAddReviewModal(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl border border-orange-200 shadow-xs transition-all hover:border-orange-400 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-display mb-1">
              4.9 <span className="text-2xl text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Based on over 12,480+ verified purchase reviews since 2012
            </p>
          </div>

          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="w-12 text-slate-700">5 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[94%]"></div>
              </div>
              <span className="w-10 text-right font-bold text-slate-800">94%</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="w-12 text-slate-700">4 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[5%]"></div>
              </div>
              <span className="w-10 text-right font-bold text-slate-800">5%</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="w-12 text-slate-700">3 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[1%]"></div>
              </div>
              <span className="w-10 text-right font-bold text-slate-800">1%</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'followers', label: 'Followers' },
            { id: 'likes', label: 'Likes' },
            { id: 'views', label: 'Views' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`filter-review-${tab.id}`}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{rev.name}</span>
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{rev.username}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Stars & Service tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-extrabold bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-100">
                    {rev.service}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-2 font-display">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {rev.text}
                </p>
              </div>

              {/* Helpful footer */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Order
                </span>

                <button
                  id={`helpful-btn-${rev.id}`}
                  onClick={() => handleLikeReview(rev.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    likedReviews[rev.id]
                      ? 'text-orange-600 bg-orange-50 font-bold'
                      : 'hover:text-orange-600 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Helpful ({rev.likesCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Writing a Review */}
        {showAddReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150">
              <button
                id="close-review-modal-btn"
                onClick={() => setShowAddReviewModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-orange-600 font-extrabold text-xs uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" /> Share Your Experience
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-4">
                Leave a Verified Review
              </h3>

              {formSuccess ? (
                <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <div className="font-bold text-base">Thank you for your review!</div>
                  <div className="text-xs text-emerald-700">Your feedback has been published.</div>
                </div>
              ) : (
                <form onSubmit={handleCreateReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[42px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Handle / Username</label>
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="@username"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[42px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service Used</label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[42px]"
                      >
                        <option value="5,000 Active Followers">5,000 Active Followers</option>
                        <option value="1,000 Premium Likes">1,000 Premium Likes</option>
                        <option value="10,000 Video Views">10,000 Video Views</option>
                        <option value="Automatic Likes">Automatic Likes</option>
                        <option value="VIP Influencer Package">VIP Influencer Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                      <div className="flex items-center gap-1 mt-1.5 min-h-[42px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setNewRating(s)}
                            className="p-1.5 text-amber-400 focus:outline-none cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${s <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Blown away by the fast delivery!"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Detailed Review</label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Tell other creators about your results, delivery speed, and account growth..."
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="submit-review-form-btn"
                    className="w-full bg-gradient-to-r from-[#ff5500] to-[#e61e50] hover:from-[#e04500] hover:to-[#cf1645] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer min-h-[44px]"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

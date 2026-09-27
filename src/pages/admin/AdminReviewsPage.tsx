import React from 'react';
import { Star, Check, X, Trash2, Heart } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useReviewsStore } from '../../stores/useReviewsStore';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, approveReview, rejectReview, toggleFeatured, deleteReview } = useReviewsStore();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Guest Reviews & Moderation"
        subtitle="Manage approved customer testimonials, star ratings, and homepage featured reviews."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Testimonial Comment</th>
                  <th className="py-3 px-4">Homepage Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3.5 px-4 font-bold text-[#171717]">{rev.customerName}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex text-[#E9B949]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-display font-bold text-xs uppercase text-[#A82D24]">
                      {rev.productName || 'General Order'}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm italic text-[#77736E]">
                      "{rev.comment}"
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(rev.id)}
                        className={`p-1.5 border transition-colors cursor-pointer ${
                          rev.isFeatured
                            ? 'bg-[#E9B949] text-[#171717] border-[#171717]'
                            : 'bg-white text-gray-400 border-gray-300'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase font-display px-2 py-0.5 border ${
                          rev.isApproved
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        }`}
                      >
                        {rev.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {rev.isApproved ? (
                          <button
                            onClick={() => rejectReview(rev.id)}
                            className="p-1 hover:bg-red-100 text-red-700 cursor-pointer"
                            title="Unapprove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => approveReview(rev.id)}
                            className="p-1 hover:bg-green-100 text-green-700 cursor-pointer"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="p-1 hover:bg-[#A82D24] hover:text-white text-[#77736E] transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

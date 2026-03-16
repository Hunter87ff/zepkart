import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { ChevronDown, HelpCircle, ShoppingBag, Truck, RotateCcw } from 'lucide-react';

const faqs = [
  {
    category: 'Orders',
    icon: ShoppingBag,
    questions: [
      {
        q: 'How do I place an order?',
        a: 'To place an order, browse through our collection, select the item you like, add it to your cart, and proceed to checkout. Follow the prompts to enter your address and payment details.'
      },
      {
        q: 'Can I cancel my order?',
        a: 'Yes, you can cancel your order before it has been shipped. Go to your Orders page, select the order you wish to cancel, and click the Cancel button.'
      }
    ]
  },
  {
    category: 'Shipping',
    icon: Truck,
    questions: [
      {
        q: 'What are the delivery charges?',
        a: 'We offer free delivery on all orders above ₹499. For orders below this amount, a standard shipping fee of ₹40 applies.'
      },
      {
        q: 'How long will it take for my order to arrive?',
        a: 'Most orders are delivered within 2-5 business days. You can track your order in real-time through the Orders page.'
      }
    ]
  },
  {
    category: 'Returns',
    icon: RotateCcw,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day hassle-free return policy for most items. The product must be in its original condition with all tags and packaging intact.'
      },
      {
        q: 'How long does it take for a refund?',
        a: 'Once we receive the returned item, it usually takes 3-5 business days to process the refund to your original payment method.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('Orders-0');

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <Layout bgWhite>
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the product and billing. Can't find the answer? Feel free to contact us.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                  <category.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, idx) => {
                  const id = `${category.category}-${idx}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div 
                      key={id}
                      className={`border rounded-2xl transition-all duration-300 ${
                        isOpen ? 'border-primary bg-primary/[0.02] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className={`font-semibold ${isOpen ? 'text-primary' : 'text-gray-900'}`}>
                          {faq.q}
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                        />
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100/50 pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <h2 className="text-2xl font-bold mb-4 relative z-10">Still have questions?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <button className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all active:scale-95 relative z-10">
            Get in Touch
          </button>
        </div>
      </div>
    </Layout>
  );
}

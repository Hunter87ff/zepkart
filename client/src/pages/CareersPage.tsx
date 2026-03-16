import Layout from '../components/Layout/Layout';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Target, Users } from 'lucide-react';

const jobs = [
  { title: 'Senior Frontend Developer', location: 'Bangalore / Remote', type: 'Full Time', department: 'Engineering' },
  { title: 'Product UI/UX Designer', location: 'Bangalore', type: 'Full Time', department: 'Design' },
  { title: 'Operations Manager', location: 'Mumbai', type: 'Full Time', department: 'Logistics' },
  { title: 'Customer Success Executive', location: 'Remote', type: 'Full Time', department: 'Support' },
];

export default function CareersPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Join the <span className="text-primary">Zepkart</span> Team</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to redefine e-commerce. Come help us build the future of shopping.
          </p>
        </div>

        {/* Culture Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Zap, title: 'Fast-Paced', desc: 'We move quickly and iterate constantly to deliver the best experience.' },
            { icon: Target, title: 'Impact-Driven', desc: 'Every line of code and every decision directly affects millions of users.' },
            { icon: Users, title: 'Inclusive', desc: 'We believe great ideas come from everywhere and everyone.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Briefcase className="text-primary" /> Current Openings
          </h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                    <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-md font-medium">{job.department}</span>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition-all group-hover:px-8">
                  Apply Now <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

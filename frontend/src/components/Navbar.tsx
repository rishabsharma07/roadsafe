import { Menu, X, Shield } from 'lucide-react';


interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}


const navLinks = [

  {
    label: 'Dashboard',
    key: 'dashboard'
  },

  {
    label: 'Live Prediction',
    key: 'prediction'
  },

  {
    label: 'Heatmap',
    key: 'heatmap'
  },

  {
    label: 'Analytics',
    key: 'analytics'
  },

  {
    label: 'Explainability',
    key: 'explainability'
  },
];


export default function Navbar({
  currentPage,
  onNavigate,
  sidebarOpen,
  setSidebarOpen
}: NavbarProps) {

  return (

    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="flex items-center justify-between px-4 h-14">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          <button
            className="lg:hidden p-1.5 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >

            {
              sidebarOpen

                ? <X size={20} />

                : <Menu size={20} />
            }

          </button>

          <div className="flex items-center gap-2">

            <Shield
              size={22}
              className="text-blue-600"
            />

            <span className="font-bold text-gray-900 text-lg tracking-tight">
              RoadSafe
            </span>

          </div>

          <span className="hidden sm:block text-xs text-gray-400 font-medium ml-1">

            AI Accident Risk Prediction System

          </span>

        </div>


        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">

          {
            navLinks.map((link) => (

              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`

                  px-3 py-1.5 rounded text-sm
                  font-medium transition-colors

                  ${
                    currentPage === link.key

                      ? 'bg-blue-50 text-blue-700'

                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >

                {link.label}

              </button>
            ))
          }

        </nav>


        {/* Right Section */}
        <div className="flex items-center gap-2">

          <span className="text-xs text-gray-500 hidden sm:block">
            v1.0.0
          </span>

          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">

            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>

            Live

          </span>

        </div>

      </div>

    </header>
  );
}
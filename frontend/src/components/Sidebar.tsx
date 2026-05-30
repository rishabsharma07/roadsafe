import {
  LayoutDashboard,
  Zap,
  Map,
  BarChart2,
  BrainCircuit
} from 'lucide-react';


interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  open: boolean;
}


const navItems = [

  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: LayoutDashboard
  },

  {
    label: 'Live Prediction',
    key: 'prediction',
    icon: Zap
  },

  {
    label: 'Heatmap',
    key: 'heatmap',
    icon: Map
  },

  {
    label: 'Analytics',
    key: 'analytics',
    icon: BarChart2
  },

  {
    label: 'Explainability',
    key: 'explainability',
    icon: BrainCircuit
  },
];


export default function Sidebar({
  currentPage,
  onNavigate,
  open
}: SidebarProps) {

  return (

    <>

      {
        open && (

          <div className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" />

        )
      }

      <aside
        className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-white border-r border-gray-200 z-40
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:z-auto
        `}
      >

        <nav className="p-3 space-y-0.5">

          {
            navItems.map(({
              label,
              key,
              icon: Icon
            }) => (

              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`

                  w-full flex items-center gap-3
                  px-3 py-2.5 rounded text-sm
                  font-medium transition-colors text-left

                  ${
                    currentPage === key

                      ? 'bg-blue-50 text-blue-700'

                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >

                <Icon size={17} />

                {label}

              </button>
            ))
          }

        </nav>

        {/* Backend Status */}
        <div className="absolute bottom-4 left-0 right-0 px-4">

          <div className="bg-gray-50 border border-gray-200 rounded p-3">

            <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600 font-medium">

              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>

              Connected

            </div>

          </div>

        </div>

      </aside>

    </>
  );
}
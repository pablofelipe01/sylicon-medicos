import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Image
                src="/images/logo-anaesthesia.png"
                alt="ANAESTHESIA DEORUM ARS S.C.A.R.E."
                width={60}
                height={60}
                className="h-12 w-auto"
              />
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  ANAESTHESIA DEORUM ARS
                </h1>
                <p className="text-sm text-gray-600">S.C.A.R.E.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Image
              src="/images/logo-fepasde.png"
              alt="FEPASDE"
              width={60}
              height={60}
              className="h-12 w-auto"
            />
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900">
                FEPASDE
              </h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 
export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Patrimonio Médico
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Plataforma de tokenización para médicos asociados
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contacto
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                Email: info@patrimonio-medico.com
              </p>
              <p className="text-sm text-gray-600">
                Tel: +57 (1) 234-5678
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Tecnología
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                Blockchain: Polygon Network
              </p>
              <p className="text-sm text-gray-600">
                Tokens: ERC-1155
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} ANAESTHESIA DEORUM ARS S.C.A.R.E. & FEPASDE. 
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 
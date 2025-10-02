import React, { useEffect, useState } from 'react';
import CarForm from "./components/CarForm.jsx";
import CarList from "./components/CarList.jsx";
import { getBrandName } from './utils/brands.js'; // Importa a função de tradução

// JSONs fornecidos no teste
const URL_BY_BRAND = "/data/cars_by_brand.json";
const URL_ALL = "/data/cars.json";

// fallback local (caso a API não responda)
const fallbackCarsByBrand = {
  "cars": [
    { "id": 55, "timestamp_cadastro": 1696549488, "modelo_id": 88, "ano": 2014, "combustivel": "FLEX", "num_portas": 4, "cor": "BRANCA", "nome_modelo": "ETIOS", "valor": 36000, "brand": 1 },
    { "id": 23, "timestamp_cadastro": 1696531236, "modelo_id": 77, "ano": 2014, "combustivel": "FLEX", "num_portas": 4, "cor": "PRETO", "nome_modelo": "COROLLA", "valor": 120000, "brand": 1 }
  ]
};

const fallbackCars = {
  "cars": [
    { "id": 1, "timestamp_cadastro": 1696539488, "modelo_id": 12, "ano": 2015, "combustivel": "FLEX", "num_portas": 4, "cor": "BEGE", "nome_modelo": "ONIX PLUS", "valor": 50000, "brand": 2 },
    { "id": 2, "timestamp_cadastro": 1696531234, "modelo_id": 14, "ano": 2014, "combustivel": "FLEX", "num_portas": 4, "cor": "AZUL", "nome_modelo": "JETTA", "valor": 49000, "brand": 3 }
  ]
};

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableModels, setAvailableModels] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Função centralizada para processar os dados e atualizar os estados
  const processCarsData = (allCars) => {
    // Garante que a propriedade 'brand' seja sempre um NOME (string)
    const carsWithBrandNames = allCars.map(car => ({
      ...car,
      brand: getBrandName(car.brand)
    }));
    
    setCars(carsWithBrandNames);

    // Extrai modelos únicos (já com o nome da marca correto)
    const modelsMap = new Map();
    carsWithBrandNames.forEach(car => {
      if (car.modelo_id && car.nome_modelo) {
        modelsMap.set(car.modelo_id, {
          id: car.modelo_id,
          name: car.nome_modelo,
          brand: car.brand
        });
      }
    });
    setAvailableModels(Array.from(modelsMap.values()));

    // Extrai marcas únicas (apenas os nomes)
    const brandSet = new Set(carsWithBrandNames.map(car => car.brand).filter(b => b && b !== 'Sem Marca'));
    setAvailableBrands(Array.from(brandSet));
  };

  // Efeito para carregar os dados iniciais
  useEffect(() => {
    async function load() {
      setLoading(true);
      let loadedCars = [];
      try {
        const res = await fetch(URL_BY_BRAND);
        if (!res.ok) throw new Error('failed to fetch by brand');
        const json = await res.json();
        loadedCars = json.cars || [];
      } catch (e) {
        try {
          const res2 = await fetch(URL_ALL);
          if (!res2.ok) throw new Error('failed to fetch all');
          const json2 = await res2.json();
          loadedCars = [...loadedCars, ...(json2.cars || [])];
        } catch (e2) {
          console.warn('Using fallback local data', e2);
          loadedCars = [...(fallbackCarsByBrand.cars || []), ...(fallbackCars.cars || [])];
        }
      } finally {
        const persisted = JSON.parse(localStorage.getItem('wswork_cars') || '[]');
        const allCars = [...persisted, ...loadedCars];
        processCarsData(allCars);
        setLoading(false);
      }
    }
    load();
  }, []);

  // Função para lidar com a adição de um novo carro
  function handleAddCar(newCar) {
    const persisted = JSON.parse(localStorage.getItem('wswork_cars') || '[]');
    const updatedPersisted = [newCar, ...persisted];
    localStorage.setItem('wswork_cars', JSON.stringify(updatedPersisted));

    const updatedCars = [newCar, ...cars];
    processCarsData(updatedCars);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <header className="max-w-7xl mx-auto mb-8 text-center bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl animate-fade-in-down">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          
          <img 
            src="/wsworklogo.png" 
            alt="WS Work Logo" 
            className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0" 
          />

          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-tight leading-tight">
              <span className="text-purple-300">-</span> Teste React
            </h1>
          </div>

        </div>

        <p className="mt-4 text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
          Explore e gerencie uma impressionante coleção de veículos, agrupados por marca.
          <span className="block mt-1 text-sm text-gray-400">Desenvolvido com React e TailwindCSS.</span>
        </p>

      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform hover:scale-[1.005] transition-all duration-300 animate-fade-in-left">
          {loading ? (
            <div className="flex items-center justify-center h-48 bg-gray-700 rounded-lg shadow-inner text-xl text-teal-300 animate-pulse">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Carregando veículos...
            </div>
          ) : (
            <CarList cars={cars} groupBy="brand" />
          )}
        </section>

        <aside className="lg:col-span-1 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform hover:scale-[1.005] transition-all duration-300 animate-fade-in-right">
          <CarForm onSave={handleAddCar} models={availableModels} brands={availableBrands} />
        </aside>
      </main>
      
      <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-400 text-sm opacity-80 animate-fade-in-up">
        <p>&copy; {new Date().getFullYear()} WS Work. Todos os direitos reservados. Design por Tailwind CSS.</p>
      </footer>
    </div>
  );
}

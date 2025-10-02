import React, { useMemo, useState } from 'react';
import CarListItem from './CarListItem';

function formatDate(ts) {
  if (!ts) return '-';
  const n = Number(ts);
  const date = ('' + ts).length > 12 ? new Date(n) : new Date(n * 1000);
  return date.toLocaleString();
}

export default function CarList({ cars = [], groupBy = 'brand', onSelect, className = '' }) {
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sort, setSort] = useState('timestamp_desc');

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchQ = query.trim() === '' || (c.nome_modelo && c.nome_modelo.toLowerCase().includes(query.toLowerCase()));
      const matchYear = yearFilter === '' || String(c.ano) === String(yearFilter);
      return matchQ && matchYear;
    });
  }, [cars, query, yearFilter]);

  const groups = useMemo(() => {
    if (!groupBy) return { Todas: filtered };
    const g = {};
    filtered.forEach(c => {
      const key = c[groupBy] !== undefined && c[groupBy] !== null ? String(c[groupBy]) : 'Sem Marca';
      if (!g[key]) g[key] = [];
      g[key].push(c);
    });

    Object.keys(g).forEach(k => {
      g[k].sort((a, b) => {
        if (sort === 'valor_asc') return (a.valor || 0) - (b.valor || 0);
        if (sort === 'valor_desc') return (b.valor || 0) - (a.valor || 0);
        if (sort === 'ano_desc') return (b.ano || 0) - (a.ano || 0);
        return (b.timestamp_cadastro || 0) - (a.timestamp_cadastro || 0);
      });
    });

    return g;
  }, [filtered, groupBy, sort]);

  const years = useMemo(() => {
    const set = new Set(cars.map(c => c.ano).filter(Boolean));
    return Array.from(set).sort((a, b) => b - a);
  }, [cars]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-md">
        <input value={query} onChange={e => setQuery(e.target.value)} className="w-full flex-1 p-3 bg-gray-800 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" placeholder="🔎 Buscar por modelo..." />
        <div className="w-full md:w-auto flex gap-4">
          <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="w-full md:w-auto p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
            <option value="">Todos os anos</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full md:w-auto p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
            <option value="timestamp_desc">Mais recentes</option>
            <option value="valor_asc">Menor Valor</option>
            <option value="valor_desc">Maior Valor</option>
            <option value="ano_desc">Ano (novo p/ antigo)</option>
          </select>
        </div>
      </div>

      {Object.keys(groups).length === 0 && (
        <div className="p-8 text-center bg-gray-700 bg-opacity-50 rounded-lg shadow-inner text-gray-300">
          Nenhum veículo encontrado para os filtros aplicados.
        </div>
      )}

      {Object.entries(groups).map(([brandKey, items]) => (
        <div key={brandKey} className="bg-gray-700 bg-opacity-30 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-600 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-200">Marca: {brandKey}</h3>
            <span className="px-3 py-1 text-xs font-semibold text-teal-200 bg-teal-800 bg-opacity-50 rounded-full">{items.length} veículo(s)</span>
          </div>

          <div className="divide-y divide-gray-700">
            {items.map(car => (
              <CarListItem key={car.id} car={car} onSelect={() => onSelect && onSelect(car)} formatDate={formatDate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
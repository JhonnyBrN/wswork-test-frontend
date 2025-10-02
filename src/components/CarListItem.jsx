import React from 'react';

export default function CarListItem({ car, onSelect, formatDate = ts => ts }) {
  return (
    <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer" onClick={onSelect}>
      {/* Ícone com o Ano */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold text-xl text-teal-300 shadow-md">
        {car.ano || '-'}
      </div>

      {/* Informações principais */}
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <h4 className="text-lg font-bold text-gray-100">{car.nome_modelo}</h4>
          <span className="text-lg font-semibold text-green-400">
            {Number(car.valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <p className="text-sm text-gray-400">ID do Modelo: {car.modelo_id ?? '-'} | ID do Carro: {car.id}</p>
        
        {/* Detalhes extras */}
        <div className="mt-3 text-xs text-gray-300 flex flex-wrap gap-x-4 gap-y-1 border-t border-gray-700 pt-2">
          <span><strong>Combustível:</strong> {car.combustivel ?? '-'}</span>
          <span><strong>Cor:</strong> {car.cor ?? '-'}</span>
          <span><strong>Portas:</strong> {car.num_portas ?? '-'}</span>
          <span className="text-gray-400"><strong>Cadastro:</strong> {formatDate(car.timestamp_cadastro)}</span>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';

function defaultValues() {
  return {
    id: Date.now(),
    timestamp_cadastro: Math.floor(Date.now() / 1000),
    modelo_id: '',
    ano: '',
    combustivel: '',
    num_portas: '',
    cor: '',
    nome_modelo: '',
    valor: '',
    brand: '' // Campo para a marca
  };
}

// O componente agora recebe onSave, models, e a nova prop 'brands'
export default function CarForm({ onSave, models = [], brands = [] }) {
  const [form, setForm] = useState(defaultValues());
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    
    // Se o usuário seleciona um modelo do dropdown, limpa os campos de criação de novo modelo/marca
    if (name === "modelo_id") {
      setForm(f => ({ ...f, [name]: value, nome_modelo: '', brand: '' }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function parseValor(raw) {
    if (raw === null || raw === undefined) return 0;
    const s = String(raw).trim();
    if (s === '') return 0;
    const normalized = s.replace(/\./g, '').replace(',', '.');
    const n = Number(normalized);
    return isNaN(n) ? 0 : n;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    if (!form.modelo_id && !form.nome_modelo.trim()) {
      setMessage('Por favor, selecione um modelo ou digite o nome de um novo.');
      return;
    }

    let payload;

    // Cenário 1: O usuário selecionou um modelo existente
    if (form.modelo_id) {
      const selectedModel = models.find(m => String(m.id) === String(form.modelo_id));
      if (!selectedModel) {
        setMessage('Erro: Modelo selecionado não encontrado.');
        return;
      }
      payload = {
        ...form,
        nome_modelo: selectedModel.name,
        brand: selectedModel.brand,
        valor: parseValor(form.valor)
      };
    } 
    // Cenário 2: O usuário está criando um novo modelo
    else {
      if (!form.brand.trim()) {
        setMessage('A marca é obrigatória ao criar um novo modelo.');
        return;
      }
      payload = {
        ...form,
        modelo_id: form.id, // Usa o ID do carro como o novo ID do modelo
        valor: parseValor(form.valor)
      };
    }

    try {
      await new Promise(r => setTimeout(r, 300)); // Simula envio
      onSave && onSave(payload);
      setMessage('Carro salvo com sucesso!');
      setForm(defaultValues());
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Erro ao salvar: ' + String(err));
    }
  }

  // Variável para controlar a exibição do campo de marca
  const isCreatingNewModel = !form.modelo_id;

  return (
    <div className="sticky top-8">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
        ➕ Adicionar Novo Carro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown para selecionar modelos existentes */}
        <select 
          name="modelo_id" 
          value={form.modelo_id} 
          onChange={handleChange} 
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        >
          <option value="">-- Selecione um Modelo Existente --</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>{model.name} (Marca: {model.brand})</option>
          ))}
        </select>

        {/* Divisor visual para separar as opções */}
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">OU</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
        
        {/* Campos para CRIAR um novo modelo e marca */}
        <div className="space-y-4 p-4 border border-gray-700 rounded-lg">
          <input 
            name="nome_modelo" 
            value={form.nome_modelo} 
            onChange={handleChange} 
            placeholder="Crie um novo modelo (ex: FUSCA)" 
            disabled={!!form.modelo_id} // Desabilita se um modelo já foi selecionado
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition disabled:bg-gray-800 disabled:cursor-not-allowed" 
          />
          
          {/* Campo de marca que só aparece ao criar um novo modelo */}
          {isCreatingNewModel && (
            <div className="animate-fade-in-down">
              <input 
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Digite a marca (ex: Volkswagen)"
                list="brands-list" // Conecta com o datalist de sugestões
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              <datalist id="brands-list">
                {brands.map(b => <option key={b} value={b} />)}
              </datalist>
            </div>
          )}
        </div>
        
        {/* Restante do formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="ano" value={form.ano} onChange={handleChange} placeholder="Ano" type="number" required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="num_portas" value={form.num_portas} onChange={handleChange} placeholder="Nº de Portas" type="number" required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="combustivel" value={form.combustivel} onChange={handleChange} placeholder="Combustível" required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="cor" value={form.cor} onChange={handleChange} placeholder="Cor" required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
        </div>
         <input name="valor" value={form.valor} onChange={handleChange} placeholder="Valor (R$)" required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />

        <div className="flex gap-4 pt-2">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300" type="submit">
            Salvar Carro
          </button>
          <button type="button" onClick={() => setForm(defaultValues())} className="flex-1 px-4 py-3 bg-gray-600 text-gray-200 font-bold rounded-lg shadow-lg hover:bg-gray-500 transition-colors duration-300">
            Limpar
          </button>
        </div>
      </form>

      {message && <div className="mt-4 text-center text-sm p-3 rounded-lg bg-teal-500 bg-opacity-20 text-teal-300">{message}</div>}
    </div>
  );
}
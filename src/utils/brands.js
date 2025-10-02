// Este objeto serve como nosso "banco de dados" de marcas.
// Ele traduz o ID que vem do JSON para um nome legível.
export const BRAND_MAP = {
  1: 'Toyota',
  2: 'Chevrolet',
  3: 'Volkswagen',
};

/**
 * Função para obter o nome da marca de forma segura.
 * Ela lida tanto com IDs (números) quanto com nomes (strings).
 * @param {number | string} brandValue - O valor da marca (pode ser 1 ou "Toyota").
 * @returns {string} - O nome da marca.
 */
export const getBrandName = (brandValue) => {
  // Se o valor já for um nome (string), apenas o retorna.
  if (typeof brandValue === 'string') {
    return brandValue;
  }
  // Se for um número, procura no nosso mapa.
  if (typeof brandValue === 'number') {
    return BRAND_MAP[brandValue] || `Marca ID ${brandValue}`; // Fallback para IDs desconhecidos
  }
  // Se for nulo ou indefinido, retorna um padrão.
  return 'Sem Marca';
};

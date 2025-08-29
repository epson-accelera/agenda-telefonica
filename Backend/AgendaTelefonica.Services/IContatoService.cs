using AgendaTelefonica.Data.Models;

namespace AgendaTelefonica.Services
{
    public interface IContatoService
    {
        Task<IEnumerable<Contato>> GetAllContatosAsync();
        Task<Contato?> GetContatoByIdAsync(int id);
        Task<Contato> CreateContatoAsync(Contato contato);
        Task<bool> UpdateContatoAsync(Contato contato);
        Task<bool> DeleteContatoAsync(int id);
    }
}
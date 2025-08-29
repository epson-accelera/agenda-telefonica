using AgendaTelefonica.Data;
using AgendaTelefonica.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendaTelefonica.Services
{
    public class ContatoService : IContatoService
    {
        private readonly AgendaContext _context;

        public ContatoService(AgendaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contato>> GetAllContatosAsync()
        {
            return await _context.Contatos.ToListAsync();
        }

        public async Task<Contato?> GetContatoByIdAsync(int id)
        {
            return await _context.Contatos.FindAsync(id);
        }

        public async Task<Contato> CreateContatoAsync(Contato contato)
        {
            _context.Contatos.Add(contato);
            await _context.SaveChangesAsync();
            return contato;
        }

        public async Task<bool> UpdateContatoAsync(Contato contato)
        {
            _context.Entry(contato).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteContatoAsync(int id)
        {
            var contato = await _context.Contatos.FindAsync(id);
            if (contato == null)
                return false;

            _context.Contatos.Remove(contato);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
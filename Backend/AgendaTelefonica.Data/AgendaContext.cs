using Microsoft.EntityFrameworkCore;
using AgendaTelefonica.Data.Models;

namespace AgendaTelefonica.Data
{
    public class AgendaContext : DbContext
    {
        public AgendaContext(DbContextOptions<AgendaContext> options) : base(options)
        {
        }

        public DbSet<Contato> Contatos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contato>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Telefone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Endereco).HasMaxLength(200);
                entity.Property(e => e.DataCriacao).HasDefaultValueSql("datetime('now')");
            });
        }
    }
}
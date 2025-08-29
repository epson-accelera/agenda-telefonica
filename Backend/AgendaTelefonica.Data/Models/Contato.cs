using System.ComponentModel.DataAnnotations;

namespace AgendaTelefonica.Data.Models
{
    public class Contato
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string Telefone { get; set; } = string.Empty;
        
        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }
        
        [StringLength(200)]
        public string? Endereco { get; set; }
        
        public DateTime DataCriacao { get; set; } = DateTime.Now;
    }
}
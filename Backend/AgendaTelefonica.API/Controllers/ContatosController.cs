using Microsoft.AspNetCore.Mvc;
using AgendaTelefonica.Data.Models;
using AgendaTelefonica.Services;

namespace AgendaTelefonica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContatosController : ControllerBase
    {
        private readonly IContatoService _contatoService;

        public ContatosController(IContatoService contatoService)
        {
            _contatoService = contatoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contato>>> GetContatos()
        {
            var contatos = await _contatoService.GetAllContatosAsync();
            return Ok(contatos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contato>> GetContato(int id)
        {
            var contato = await _contatoService.GetContatoByIdAsync(id);
            if (contato == null)
                return NotFound();
            
            return Ok(contato);
        }

        [HttpPost]
        public async Task<ActionResult<Contato>> CreateContato(Contato contato)
        {
            var novoContato = await _contatoService.CreateContatoAsync(contato);
            return CreatedAtAction(nameof(GetContato), new { id = novoContato.Id }, novoContato);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContato(int id, Contato contato)
        {
            if (id != contato.Id)
                return BadRequest();

            var updated = await _contatoService.UpdateContatoAsync(contato);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContato(int id)
        {
            var deleted = await _contatoService.DeleteContatoAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
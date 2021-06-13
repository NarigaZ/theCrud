package br.com.mkdata.teste.controller;

import java.net.URI;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import br.com.mkdata.teste.controller.dto.ClienteDto;
import br.com.mkdata.teste.controller.form.ClienteForm;
import br.com.mkdata.teste.modelo.Cliente;
import br.com.mkdata.teste.repository.ClienteRepository;
import br.com.mkdata.teste.repository.TelefoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/clientes")
public class ClientesController {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private TelefoneRepository telefoneRepository;
	
	@GetMapping
	@Cacheable(value = "listaDeClientes")
	public Page<ClienteDto> lista(@RequestParam(required = false, defaultValue = "") String nome, @RequestParam(required = false, defaultValue = "") String ativo,
								  @PageableDefault(sort = "nome", direction = Direction.DESC, page = 0, size = 10) Pageable paginacao) {

		Page<Cliente> clientes;
		if (nome.isEmpty() && ativo.isEmpty()) {
			clientes = clienteRepository.findAll(paginacao);
		} else if (ativo.isEmpty()){
			clientes = clienteRepository.findByNomeIgnoreCaseContaining(nome, paginacao);
		} else if (nome.isEmpty()) {
			clientes = clienteRepository.findByAtivo(Boolean.parseBoolean(ativo), paginacao);
		} else {
			clientes = clienteRepository.findByAtivoAndNomeIgnoreCaseContaining(Boolean.parseBoolean(ativo), nome, paginacao);
		}
		return ClienteDto.converter(clientes);
	}
	
	@PostMapping
	@Transactional
	@CacheEvict(value = "listaDeClientes", allEntries = true)
	public ResponseEntity<ClienteDto> cadastrar(@RequestBody @Valid ClienteForm form, UriComponentsBuilder uriBuilder) {
		Cliente cliente = form.converter();
		clienteRepository.save(cliente);
		
		URI uri = uriBuilder.path("/clientes/{id}").buildAndExpand(cliente.getId()).toUri();
		return ResponseEntity.created(uri).body(new ClienteDto(cliente));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ClienteDto> detalhar(@PathVariable Long id) {
		Optional<Cliente> topico = clienteRepository.findById(id);
		if (topico.isPresent()) {
			return ResponseEntity.ok(new ClienteDto(topico.get()));
		}

		return ResponseEntity.notFound().build();
	}

	@GetMapping("/cpfCnpjExistente/{cpfCnpj}")
	public Boolean cpfCnpjExistente(@PathVariable String cpfCnpj, @RequestParam(required = false) Long id) {
		 Cliente cliente = clienteRepository.findByCpfCnpj(cpfCnpj);
		return cliente != null && !cliente.getId().equals(id);
	}
	
	@PutMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listaDeClientes", allEntries = true)
	public ResponseEntity<ClienteDto> atualizar(@PathVariable Long id, @RequestBody @Valid ClienteForm form) {
		Optional<Cliente> optional = clienteRepository.findById(id);
		if (optional.isPresent()) {
			Cliente cliente = form.atualizar(id, clienteRepository);
			return ResponseEntity.ok(new ClienteDto(cliente));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listaDeClientes", allEntries = true)
	public ResponseEntity<?> remover(@PathVariable Long id) {
		Optional<Cliente> optional = clienteRepository.findById(id);
		if (optional.isPresent()) {
			clienteRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

}
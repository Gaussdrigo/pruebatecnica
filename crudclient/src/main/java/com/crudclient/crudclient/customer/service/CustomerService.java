package com.crudclient.crudclient.customer.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crudclient.crudclient.customer.dto.CustomerRequest;
import com.crudclient.crudclient.customer.dto.CustomerResponse;
import com.crudclient.crudclient.customer.entity.Customer;
import com.crudclient.crudclient.customer.exception.BadRequestException;
import com.crudclient.crudclient.customer.exception.NotFoundException;
import com.crudclient.crudclient.customer.mapper.CustomerMapper;
import com.crudclient.crudclient.customer.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;

    @Transactional(readOnly = true)
    public List<CustomerResponse> list(String q) {
        var result = (q == null || q.isBlank())
                ? repository.findAll()
                : repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q);

        return result.stream().map(CustomerMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CustomerResponse getById(Long id) {
        Customer customer = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encontro el cliente con id: " + id));
        return CustomerMapper.toResponse(customer);
    }

    @Transactional
    public CustomerResponse create(CustomerRequest req) {
        if (repository.existsByEmailIgnoreCase(req.email())) {
            throw new BadRequestException("Email ya existe");
        }

        Customer customer = Customer.builder()
                .name(req.name())
                .email(req.email())
                .status(req.status())
                .build();

        return CustomerMapper.toResponse(repository.save(customer));
    }

    @Transactional
    public CustomerResponse update(Long id, CustomerRequest req) {
        Customer customer = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("No se encontro el cliente con id: " + id));

        // si cambia el email, validar duplicado
        if (!customer.getEmail().equalsIgnoreCase(req.email())
                && repository.existsByEmailIgnoreCase(req.email())) {
            throw new BadRequestException("Email ya existe");
        }

        CustomerMapper.updateEntity(customer, req);
        return CustomerMapper.toResponse(repository.save(customer));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("No se encontro el cliente con id: " + id);
        }
        repository.deleteById(id);
    }
}
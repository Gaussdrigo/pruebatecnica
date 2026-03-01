package com.crudclient.crudclient.customer.mapper;

import com.crudclient.crudclient.customer.dto.CustomerRequest;
import com.crudclient.crudclient.customer.entity.Customer;
import com.crudclient.crudclient.customer.dto.CustomerResponse;

public class CustomerMapper {

    public static CustomerResponse toResponse(Customer c) {
        return new CustomerResponse(
                c.getId(),
                c.getName(),
                c.getEmail(),
                c.getStatus(),
                c.getCreatedAt()
        );
    }

    public static void updateEntity(Customer c, CustomerRequest req) {
        c.setName(req.name());
        c.setEmail(req.email());
        c.setStatus(req.status());
    }
}
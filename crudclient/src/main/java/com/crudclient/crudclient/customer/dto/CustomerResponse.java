package com.crudclient.crudclient.customer.dto;

import java.time.Instant;

import com.crudclient.crudclient.customer.entity.CustomerStatus;

public record CustomerResponse(
        Long id,
        String name,
        String email,
        CustomerStatus status,
        Instant createdAt
) {}
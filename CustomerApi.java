package com.example.loancalculator.Loan.Controller;

import com.example.loancalculator.Loan.Model.Customer;
import com.example.loancalculator.Loan.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerApi {
    @Autowired
    private CustomerService customerService;

    @PostMapping
    public Customer post(@RequestBody Customer customer) {
        return customerService.post(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomer() {
        return customerService.getCustomer();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable Integer id) {
        return customerService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        customerService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateCustomer(id, customer);
        return ResponseEntity.ok(updatedCustomer);
    }
}

package com.example.loancalculator.Loan.Service;

import com.example.loancalculator.Loan.Model.Customer;
import com.example.loancalculator.Loan.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    public Customer post(Customer customer) {
        return customerRepo.save(customer);
    }

    public List<Customer> getCustomer() {
        return customerRepo.findAll();
    }

    public Optional<Customer> getById(Integer id) {
        return customerRepo.findById(id);
    }

    public void deleteById(Integer id) {
        customerRepo.deleteById(id);
    }

    public Customer updateCustomer(int id, Customer customer) {
        Optional<Customer> existingCustomerOptional = customerRepo.findById(id);

        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();
            existingCustomer.setName(customer.getName());
            existingCustomer.setMonth(customer.getMonth());
            existingCustomer.setAmount(customer.getAmount());
            existingCustomer.setInterestrate(customer.getInterestrate());
            existingCustomer.setPhone(customer.getPhone());

            return customerRepo.save(existingCustomer);
        } else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }
}

package com.example.loancalculator.Loan.Repository;

import com.example.loancalculator.Loan.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
}

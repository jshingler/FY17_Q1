package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.repository.EmployeeRepository;
import com.mycompany.myapp.repository.search.EmployeeSearchRepository;
import com.mycompany.myapp.web.rest.dto.EmployeeDTO;
import com.mycompany.myapp.web.rest.mapper.EmployeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Employee.
 */
@Service
@Transactional
public class EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeService.class);
    
    @Inject
    private EmployeeRepository employeeRepository;
    
    @Inject
    private EmployeeMapper employeeMapper;
    
    @Inject
    private EmployeeSearchRepository employeeSearchRepository;
    
    /**
     * Save a employee.
     * 
     * @param employeeDTO the entity to save
     * @return the persisted entity
     */
    public EmployeeDTO save(EmployeeDTO employeeDTO) {
        log.debug("Request to save Employee : {}", employeeDTO);
        Employee employee = employeeMapper.employeeDTOToEmployee(employeeDTO);
        employee = employeeRepository.save(employee);
        EmployeeDTO result = employeeMapper.employeeToEmployeeDTO(employee);
        employeeSearchRepository.save(employee);
        return result;
    }

    /**
     *  Get all the employees.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Employee> findAll(Pageable pageable) {
        log.debug("Request to get all Employees");
        Page<Employee> result = employeeRepository.findAll(pageable); 
        return result;
    }

    /**
     *  Get one employee by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public EmployeeDTO findOne(Long id) {
        log.debug("Request to get Employee : {}", id);
        Employee employee = employeeRepository.findOne(id);
        EmployeeDTO employeeDTO = employeeMapper.employeeToEmployeeDTO(employee);
        return employeeDTO;
    }

    /**
     *  Delete the  employee by id.
     *  
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Employee : {}", id);
        employeeRepository.delete(id);
        employeeSearchRepository.delete(id);
    }

    /**
     * Search for the employee corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Employee> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Employees for query {}", query);
        return employeeSearchRepository.search(queryStringQuery(query), pageable);
    }
}

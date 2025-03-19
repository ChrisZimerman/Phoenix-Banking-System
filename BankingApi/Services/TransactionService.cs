using BankingApi.Models;
using BankingApi.Repositories;
using BankingApi.ServiceAgents;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankingApi.Services
{
    /// <summary>
    /// Handles business logic for transactions.
    /// Communicates with both the repository and service agent.
    /// </summary>
    public class TransactionService
    {
        private readonly TransactionRepository _repository; 
        private readonly TransactionServiceAgent _serviceAgent; 

        public TransactionService(TransactionRepository repository, TransactionServiceAgent serviceAgent)
        {
            _repository = repository;
            _serviceAgent = serviceAgent;
        }

        public async Task<List<TransactionModel>> GetAllTransactionsAsync()
        {
            return await _repository.GetAllTransactionsAsync();
        }

        public async Task<TransactionModel?> GetTransactionByIdAsync(int id)
        {
            return await _repository.GetTransactionByIdAsync(id);
        }

    
        public async Task<TransactionModel?> AddTransactionAsync(TransactionModel transaction)
        {
            if (transaction.Amount == null || transaction.Amount <= 0)
            {
                throw new Exception("Transaction amount must be greater than zero.");
            }

            if (transaction.ActionType != "Deposit" && transaction.ActionType != "Withdrawal")
            {
                throw new Exception("Invalid transaction type. Must be 'Deposit' or 'Withdrawal'.");
            }

            if (string.IsNullOrWhiteSpace(transaction.Status))
            {
                transaction.Status = "Pending";
            }

            if (string.IsNullOrWhiteSpace(transaction.UserId))
            {
                throw new Exception("UserId cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(transaction.AccountNumber))
            {
                throw new Exception("AccountNumber cannot be empty.");
            }

            if (transaction.ActionType == "Withdrawal")
            {
                var previousTransactions = await _repository.GetUserTransactionsAsync(transaction.UserId);

                Console.WriteLine($"User {transaction.UserId} has {previousTransactions.Count} previous transactions.");

                if (previousTransactions.Count == 0)
                {
                    throw new Exception("Cannot withdraw. No previous transactions found for this user.");
                }
            }

            var token = await _serviceAgent.GetAuthTokenAsync(transaction.UserId)
                ?? throw new Exception("Failed to authenticate with the banking provider.");

            var success = await _serviceAgent.ProcessTransactionAsync(
                transaction.Amount.Value,
                transaction.AccountNumber,
                token
            );

            transaction.Status = success ? "Approved" : "Rejected";

            if (!success)
            {
                throw new Exception("Transaction was declined by the banking provider.");
            }

            await _repository.AddTransactionAsync(transaction);
            return transaction;
        }

   
        public async Task<TransactionModel?> UpdateTransactionAsync(TransactionModel transaction)
        {
            var existingTransaction = await _repository.GetTransactionByIdAsync(transaction.Id);
            if (existingTransaction == null)
            {
                throw new Exception($"Transaction with ID {transaction.Id} not found.");
            }

            if (transaction.Amount == null || transaction.Amount <= 0)
            {
                throw new Exception("Transaction amount must be greater than zero.");
            }

            existingTransaction.Amount = transaction.Amount;

            await _repository.UpdateTransactionAsync(existingTransaction);
            return existingTransaction;
        }



        public async Task<bool> DeleteTransactionAsync(int id)
        {
            var transaction = await _repository.GetTransactionByIdAsync(id);
            if (transaction == null)
                return false;

            await _repository.DeleteTransactionAsync(id);
            return true;
        }
    }
}

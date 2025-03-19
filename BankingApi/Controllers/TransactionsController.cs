using BankingApi.Models;
using BankingApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankingApi.Controllers
{
    /// <summary>
    /// API Controller for managing transactions.
    /// Handles user requests and forwards them to the service layer.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _service;

        public TransactionsController(TransactionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionModel>>> GetAllTransactions()
        {
            var transactions = await _service.GetAllTransactionsAsync();
            return Ok(transactions);
        }

  
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionModel>> GetTransactionById(int id)
        {
            var transaction = await _service.GetTransactionByIdAsync(id);
            if (transaction == null)
            {
                return NotFound($"Transaction with ID {id} not found.");
            }
            return Ok(transaction);
        }


        [HttpPost]
        public async Task<ActionResult<TransactionModel>> AddTransaction([FromBody] TransactionModel transaction)
        {
            try
            {
                var newTransaction = await _service.AddTransactionAsync(transaction);
                if (newTransaction == null)
                {
                    return BadRequest("Invalid action type. Must be 'Deposit' or 'Withdrawal'.");
                }

                return CreatedAtAction(nameof(GetTransactionById), new { id = newTransaction!.Id }, newTransaction);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

 
        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionModel>> UpdateTransaction(int id, [FromBody] Dictionary<string, object> updateData)
        {
            try
            {
                var existingTransaction = await _service.GetTransactionByIdAsync(id);
                if (existingTransaction == null)
                {
                    return NotFound($"Transaction with ID {id} not found.");
                }

                if (!updateData.ContainsKey("amount"))
                {
                    return BadRequest("Amount field is required.");
                }

                if (!int.TryParse(updateData["amount"].ToString(), out int newAmount) || newAmount <= 0)
                {
                    return BadRequest("Invalid amount value.");
                }

                existingTransaction.Amount = newAmount;

                var updatedTransaction = await _service.UpdateTransactionAsync(existingTransaction);
                return Ok(updatedTransaction);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var existingTransaction = await _service.GetTransactionByIdAsync(id);
            if (existingTransaction == null)
            {
                return NotFound($"Transaction with ID {id} not found.");
            }

            await _service.DeleteTransactionAsync(id);
            return NoContent();
        }
    }
}

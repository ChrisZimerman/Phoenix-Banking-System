using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BankingApi.ServiceAgents
{
    /// <summary>
    /// Handles communication with the external banking API.
    /// This simulates requests to a third-party banking provider.
    /// </summary>
    public class TransactionServiceAgent
    {
        private readonly HttpClient _httpClient;

        public TransactionServiceAgent(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        public async Task<string?> GetAuthTokenAsync(string userId)
        {
            var requestBody = new
            {
                userId = userId,
                secretId = "Je45GDf34"
            };

            await Task.Delay(500); // Simulate network delay

            // Randomize success/failure (60% success, 40% failure)
            bool isSuccess = new Random().Next(1, 101) <= 60;

            var response = new AuthTokenResponse
            {
                Code = isSuccess ? "success" : "error",
                Data = isSuccess ? "mocked-auth-token-123456" : null
            };

            return response.Code == "success" ? response.Data : null;
        }


        public async Task<bool> ProcessTransactionAsync(int amount, string accountNumber, string token)
        {
            var requestBody = new
            {
                amount = amount,
                bank = accountNumber,
                token = token
            };

            await Task.Delay(500); // Simulate network delay

            // Randomize success/failure (70% success, 30% failure)
            bool isSuccess = new Random().Next(1, 101) <= 70;

            return isSuccess;
        }
    }

 
    public class AuthTokenResponse
    {
        public string? Code { get; set; }
        public string? Data { get; set; }
    }
}

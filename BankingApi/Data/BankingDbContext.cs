using Microsoft.EntityFrameworkCore;
using BankingApi.Models;

namespace BankingApi.Data
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options) { }

        public DbSet<TransactionModel> Transactions { get; set; }
    }
}

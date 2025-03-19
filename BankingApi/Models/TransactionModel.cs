using System.ComponentModel.DataAnnotations;

namespace BankingApi.Models
{
    public class TransactionModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"^[א-ת' -]+$", ErrorMessage = "Full name must contain only Hebrew letters, spaces, hyphens, and apostrophes.")]
        public string? FullNameHebrew { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"^[A-Za-z' -]+$", ErrorMessage = "Full name must contain only English letters, spaces, hyphens, and apostrophes.")]
        public string? FullNameEnglish { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [StringLength(9, MinimumLength = 9)]
        [RegularExpression("^[0-9]+$", ErrorMessage = "User ID must contain exactly 9 digits.")]
        public string? UserId { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 1)]
        [RegularExpression("^[0-9]+$", ErrorMessage = "Account number can contain only digits.")]
        public string? AccountNumber { get; set; }

        [Required]
        [Range(1, 9999999999)]
        public int? Amount { get; set; }

        [Required]
        public string? ActionType { get; set; }

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        [Required]
        public string Status { get; set; } = "Pending";  // Default value: "Pending"
    }
}

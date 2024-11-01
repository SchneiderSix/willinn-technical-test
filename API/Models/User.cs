using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {

        public string ID { get; set; } = null!;

        [Required]
        [StringLength(30, ErrorMessage = "{0} value cannot exceed {1} characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress(ErrorMessage = "{0} must be a valid email address.")]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression(@"^(?=.*[!@#$%^&*()_\-+={}[\]|\\:;\""'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;\""'<>,.?/~`]{3,30}$",
        ErrorMessage = "{0} must be {1}-{2} characters long and contain at least one special character.")]
        public string Password { get; set; } = null!;
        public bool IsActive { get; set; } = true;
    }
}

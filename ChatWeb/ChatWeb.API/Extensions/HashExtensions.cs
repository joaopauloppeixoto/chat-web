using System.Security.Cryptography;
using System.Text;

namespace ChatWeb.API.Extensions;

public static class HashExtensions
{
    public static string GenerateHash(this HashAlgorithm algorithm, string text)
    {
        var encodedValue = Encoding.UTF8.GetBytes(text);
        var encryptedText = algorithm.ComputeHash(encodedValue);

        var sb = new StringBuilder();
        foreach (var character in encryptedText)
        {
            sb.Append(character.ToString("X2"));
        }

        return sb.ToString();
    }
}

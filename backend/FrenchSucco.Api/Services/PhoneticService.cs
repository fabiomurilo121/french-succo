namespace FrenchSucco.Api.Services;

public interface IPhoneticService
{
    string ToPortuguesePhonetic(string frenchText);
}

public class PhoneticService : IPhoneticService
{
    private static readonly Dictionary<string, string> _map = new(StringComparer.OrdinalIgnoreCase)
    {
        ["bonjour"] = "bõ-jur",
        ["comment"] = "kõ-mã",
        ["allez"] = "a-le",
        ["vous"] = "vu",
        ["aujourd"] = "o-zhur",
        ["hui"] = "üi",
        ["je"] = "zhe",
        ["voudrais"] = "vu-drê",
        ["commander"] = "ko-mã-dé",
        ["un"] = "um",
        ["café"] = "ca-fé",
        ["au"] = "o",
        ["lait"] = "lê",
        ["s'il"] = "sil",
        ["plaît"] = "plê",
        ["où"] = "u",
        ["se"] = "se",
        ["trouve"] = "truv",
        ["la"] = "la",
        ["boulangerie"] = "bu-lã-zhe-ri",
        ["enchanté"] = "ã-shã-té",
        ["de"] = "de",
        ["rencontrer"] = "rã-kõ-tré"
    };

    public string ToPortuguesePhonetic(string frenchText)
    {
        if (string.IsNullOrWhiteSpace(frenchText)) return string.Empty;

        var normalized = frenchText.ToLowerInvariant()
            .Replace("'", " ")
            .Replace("?", " ")
            .Replace(".", " ")
            .Replace(",", " ");

        var tokens = normalized.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var parts = new List<string>();

        foreach (var token in tokens)
        {
            if (_map.TryGetValue(token, out var phonetic))
            {
                parts.Add(phonetic);
            }
            else
            {
                parts.Add(PhoneticFallback(token));
            }
        }

        return string.Join(' ', parts);
    }

    private string PhoneticFallback(string token)
    {
        var sb = new System.Text.StringBuilder();
        foreach (var c in token)
        {
            sb.Append(c switch
            {
                'à' or 'â' => "a",
                'é' or 'è' or 'ê' or 'ë' => "é",
                'î' or 'ï' => "i",
                'ô' => "o",
                'û' or 'ù' => "u",
                'ç' => "s",
                'œ' => "e",
                'æ' => "a",
                _ => c.ToString()
            });
        }
        return sb.ToString();
    }
}

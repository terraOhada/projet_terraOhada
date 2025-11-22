export const EMAIL_BIENVENUE = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue sur TerraOhada</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: rgb(255, 255, 255);">
    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <img src="https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png" 
                     alt="Logo TerraOhada" 
                     style="max-width: 150px; height: auto; display: block; margin: 0 auto 15px;">
                <h1 style="color: #0e4194; margin: 0; font-size: 24px;">Bienvenue sur notre plateforme TerraOhada !</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Bonjour <strong>{{nom_utilisateur}}</strong>,</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Merci pour votre inscription sur TerraOhada !</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Votre compte a été créé avec succès.</p>
                
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin-top: 25px;">
                    Pour commencer à explorer TerraOhada, veuillez vérifier votre compte en cliquant sur le bouton ci-dessous :
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 20px auto;">
                    <tr>
                        <td style="border-radius: 5px; background-color: #0e4194; text-align: center;">
                            <a href="{{FRONTEND_URL}}/verification-compte/{{id_user}}" 
                               style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 12px 25px; border: 1px solid #0e4194; display: inline-block; font-weight: bold;">
                                Vérifier mon compte
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 14px; color: #7f8c8d; line-height: 1.5;">
                    Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :<br>
                    <a href="{{FRONTEND_URL}}/verification-compte/{{id_user}}" style="color: #0e4194; word-break: break-all;">cliquez ici</a>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #ecf0f1; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:gestion@terraohada.com" style="color: #0e4194;">gestion@terraohada.com</a>.</p>
                <p style="font-size: 14px; color: #7f8c8d; margin: 5px 0 0;">© ${new Date().getFullYear()} TerraOhada. Tous droits réservés.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const EMAIL_VERIFICATION_CODE = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre compte TerraOhada</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: rgb(255, 255, 255);">
    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <img src="https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png" 
                     alt="Logo TerraOhada" 
                     style="max-width: 150px; height: auto; display: block; margin: 0 auto 15px;">
                <h1 style="color: #0e4194; margin: 0; font-size: 24px;">Vérification de votre compte TerraOhada</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Bonjour <strong>{{nom_utilisateur}}</strong>,</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Merci de vous être inscrit sur TerraOhada !</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Pour activer votre compte et commencer à utiliser nos services, veuillez saisir le code de vérification ci-dessous :</p>
                
                <div style="background-color: #f0f8ff; border: 2px solid #0e4194; border-radius: 8px; padding: 15px 25px; margin: 25px auto; max-width: 250px;">
                    <strong style="font-size: 28px; color: #0e4194; letter-spacing: 3px;">{{code_de_verification}}</strong>
                </div>

                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Ce code est valide pendant une durée limitée. Ne le partagez avec personne.</p>
                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Si vous n'avez pas demandé cette vérification, veuillez ignorer cet e-mail.</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #ecf0f1; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:gestion@terraohada.com" style="color: #0e4194;">gestion@terraohada.com</a>.</p>
                <p style="font-size: 14px; color: #7f8c8d; margin: 5px 0 0;">© ${new Date().getFullYear()} TerraOhada. Tous droits réservés.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const EMAIL_REINITIALISATION_CODE = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de votre mot de passe TerraOhada</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: rgb(255, 255, 255);">
    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <img src="https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png" 
                    alt="Logo TerraOhada" 
                    style="max-width: 150px; height: auto; display: block; margin: 0 auto 15px;">
                <h1 style="color: #0e4194; margin: 0; font-size: 24px;">Réinitialisation de votre mot de passe TerraOhada</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Bonjour <strong>{{nom_utilisateur}}</strong>,</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Nous avons reçu une demande de réinitialisation de votre mot de passe.</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Pour compléter cette opération, veuillez saisir le code de vérification ci-dessous :</p>
                
                <div style="background-color: #f0f8ff; border: 2px solid #0e4194; border-radius: 8px; padding: 15px 25px; margin: 25px auto; max-width: 250px;">
                    <strong style="font-size: 28px; color: #0e4194; letter-spacing: 3px;">{{code_de_verification}}</strong>
                </div>

                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Ce code est valide pendant une durée limitée. Ne le partagez avec personne.</p>
                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #ecf0f1; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:gestion@terraohada.com" style="color: #0e4194;">gestion@terraohada.com</a>.</p>
                <p style="font-size: 14px; color: #7f8c8d; margin: 5px 0 0;">© ${new Date().getFullYear()} TerraOhada. Tous droits réservés.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const EMAIL_RESET_PASSWORD = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de votre mot de passe TerraOhada</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: rgb(255, 255, 255);">
    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <img src="https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png" 
                    alt="Logo TerraOhada" 
                    style="max-width: 150px; height: auto; display: block; margin: 0 auto 15px;">
                <h1 style="color: #0e4194; margin: 0; font-size: 24px;">Réinitialisation de votre mot de passe TerraOhada</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Bonjour <strong>{{nom_utilisateur}}</strong>,</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte TerraOhada.</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5;">Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
                
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 20px auto;">
                    <tr>
                        <td style="border-radius: 5px; background-color: #0e4194; text-align: center;">
                            <a href="{{FRONTEND_URL}}/reinitialisation-mot-de-passe/{{token_de_reinitialisation}}" 
                               style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 12px 25px; border: 1px solid #0e4194; display: inline-block; font-weight: bold;">
                                Réinitialiser mon mot de passe
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 14px; color: #7f8c8d; line-height: 1.5;">
                    Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :<br>
                    <a href="{{FRONTEND_URL}}/reinitialisation-mot-de-passe/{{token_de_reinitialisation}}" style="color: #0e4194; word-break: break-all;">Lien de réinitilisation</a>
                </p>

                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Ce lien est valide pendant une durée limitée. Ne le partagez avec personne.</p>
                <p style="font-size: 14px; color: #555555; line-height: 1.5;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail. Votre mot de passe actuel restera inchangé.</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #ecf0f1; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:gestion@terraohada.com" style="color: #0e4194;">gestion@terraohada.com</a>.</p>
                <p style="font-size: 14px; color: #7f8c8d; margin: 5px 0 0;">© ${new Date().getFullYear()} TerraOhada. Tous droits réservés.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;


